package com.csg.warehouse.utils;


import com.csg.warehouse.common.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.joda.time.DateTime;

import java.util.UUID;

public class JwtUtils {

    public static String getToken(String subject) {
        Claims claims = Jwts.claims().setId(UUID.randomUUID().toString()).setSubject(subject);
        DateTime currentTime = new DateTime();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentTime.toDate())
                .setExpiration(currentTime.plusMinutes(Constants.TOKEN_EXPIRATION_TIME).toDate())
                .signWith(SignatureAlgorithm.HS512, Constants.JWT_KEY)
                .compact();
    }

    public static Jws<Claims> parseToken(String token) {
        return Jwts.parser().setSigningKey(Constants.JWT_KEY).parseClaimsJws(token);
    }
}
