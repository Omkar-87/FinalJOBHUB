package com.jobhubai.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

@Service
public class JWTservice {

    private String secretkey;

    public JWTservice() {

        try {

            KeyGenerator keyGenerator =
                    KeyGenerator.getInstance("HmacSHA256");

            SecretKey sk =
                    keyGenerator.generateKey();

            secretkey =
                    Base64.getEncoder()
                            .encodeToString(
                                    sk.getEncoded()
                            );

        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException(e);
        }
    }

    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 30
                        )
                )
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(secretkey);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}