package service;



import com.nimbusds.jose.JOSEException;
import dto.request.AuthRequestDTO;
import dto.request.RegisterRequestDTO;
import dto.response.AuthResponse;
import dto.response.IntrospectiveResponse;
import entity.Users;
import jakarta.servlet.http.HttpServletRequest;

import java.text.ParseException;


public interface AuthService {

    AuthResponse isAuthenticated(AuthRequestDTO authRequestDTO);
    String generateToken(Users users);
    IntrospectiveResponse introspect(HttpServletRequest request) throws JOSEException, ParseException;
    long registerCustomer(RegisterRequestDTO registerRequestDTO);
    boolean logout(HttpServletRequest request);

}
