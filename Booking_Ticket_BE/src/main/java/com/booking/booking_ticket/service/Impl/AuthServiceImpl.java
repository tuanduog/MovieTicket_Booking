package com.booking.booking_ticket.service.Impl;


import com.booking.booking_ticket.dto.request.AuthRequestDTO;
import com.booking.booking_ticket.dto.request.RegisterRequestDTO;
import com.booking.booking_ticket.entity.InvalidToken;
import com.booking.booking_ticket.entity.Users;
import com.booking.booking_ticket.repository.InvalidTokenRepsitory;
import com.booking.booking_ticket.repository.UsersRepository;
import com.booking.booking_ticket.utils.UserRole;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.booking.booking_ticket.dto.response.AuthResponse;
import com.booking.booking_ticket.dto.response.IntrospectiveResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.booking.booking_ticket.service.AuthService;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    private  final InvalidTokenRepsitory invalidTokenRepsitory;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @Override
    public AuthResponse isAuthenticated(AuthRequestDTO authRequestDTO) {
        var account = usersRepository.findByUsername(authRequestDTO.getUsername()).orElseThrow();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean isAuth = passwordEncoder.matches(authRequestDTO.getPassword(), account.getPassword());
        if(!isAuth)
        {
            log.error("unauthenticated !");
            return AuthResponse.builder()
                    .token(null)
                    .isAuthenticated(false)
                    .build();
        }
        var token = generateToken(account);
        return AuthResponse.builder()
                .token(token)
                .isAuthenticated(true)
                .build();
    }

    @Override
    public String generateToken(Users account) {
        JWSHeader  jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        String role;
        if(account.getUserRole() == UserRole.CUSTOMER)
            role = "Customer";
        else
            role = account.getUserRole() == UserRole.MANAGER ? "Manager" : "Administrator";


        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .claim("scope",role)
                .subject(account.getUsername())
                .issuer("BetaCineplex.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        JWSObject jwsObject  = new JWSObject(jwsHeader,payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        }catch (Exception e)
        {
            log.error("Cannot create token error: {}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public IntrospectiveResponse introspect(HttpServletRequest request) throws JOSEException, ParseException {
        String token = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(c -> "jwt".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if(token == null)
            return IntrospectiveResponse.builder().isValid(false).build();
        boolean checkInvalid = (invalidTokenRepsitory.findById(token) == null) ? false : true;

        System.out.println(checkInvalid);
        JWSVerifier verifier  = new MACVerifier(SIGNER_KEY.getBytes());
        Optional<InvalidToken> itokens =  invalidTokenRepsitory.findById(token);
        InvalidToken invalidToken = itokens.orElse(null);
        SignedJWT jwt =  SignedJWT.parse(token);
        var verifired = jwt.verify(verifier);

        Date exprirationTime = jwt.getJWTClaimsSet().getExpirationTime();
        boolean checkDate = false;
        if (invalidToken != null) {
            checkDate = invalidToken.getExpired_at().equals(exprirationTime.toInstant());
        }

        checkInvalid = checkDate && checkInvalid;

        return IntrospectiveResponse.builder()
                .isValid(verifired && exprirationTime.after(new Date()) && !checkInvalid)
                .username(jwt.getJWTClaimsSet().getSubject())
                .build();
    }

    @Override
    public long registerCustomer(RegisterRequestDTO registerRequestDTO) {

        Users a = Users.builder()
                .username(registerRequestDTO.getUsername())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .email(registerRequestDTO.getEmail())
                .phone(registerRequestDTO.getPhone())
                .membership("no membership")
                .userRole(UserRole.CUSTOMER)
                .build();

        Users customer = usersRepository.save(a);

        return customer.getUserId();
    }

    @Override
    public boolean logout(HttpServletRequest request) {
        try {
            String token = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                    .filter(c -> "jwt".equals(c.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);

            SignedJWT jwt = SignedJWT.parse(token);
            System.out.println(token);
//            var signToken = verifyToken(request.getToken(), true);
//            //Lấy body
//            String jit = signToken.getJWTClaimsSet().getJWTID();
//
//            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

//            log.info("DATETIME: {}", expiryTime.toInstant());

            invalidTokenRepsitory.save(InvalidToken.builder()
                    .token_id(token)
                    .expired_at(jwt.getJWTClaimsSet().getExpirationTime().toInstant())
                    .build());
            return true;
        } catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
