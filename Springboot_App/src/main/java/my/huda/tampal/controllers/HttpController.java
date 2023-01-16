package my.huda.tampal.controllers;

import my.huda.tampal.protos.TampalProtos.*;
import my.huda.tampal.service.TampalService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HttpController
{
    @Autowired
    private TampalService tampalService;

    @GetMapping(value = "/paste/find", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPaste(@RequestParam(required = false) Integer userID,
            @RequestParam(required = false) Integer pasteID)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        if (pasteID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("pasteID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        GetPasteRequest request = GetPasteRequest.newBuilder()
                .setUserID(userID)
                .setPasteID(pasteID)
                .build();
        return ResponseEntity.ok(tampalService.getPaste(request));
    }

    @GetMapping(value = "/git/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getLatestPastes(@RequestParam(required = false) Integer userID)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        GetLatestChangesRequest request = GetLatestChangesRequest.newBuilder()
                .setUserID(userID)
                .build();
        return ResponseEntity.ok(tampalService.getLatestChanges(request));
    }

    @PostMapping(path = "/paste/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createPaste(@RequestParam(required = false) Integer userID,
            @RequestBody(required = false) Paste paste)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        if (paste == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("Paste not Provided. Provide a valid paste as JSON")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        CreatePasteRequest request = CreatePasteRequest.newBuilder()
                .setUserID(userID)
                .setPaste(paste)
                .build();
        return ResponseEntity.ok(tampalService.createPaste(request));
    }

    @PutMapping(path = "/paste/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatePaste(@RequestParam(required = false) Integer userID,
            @RequestParam(required = false) Integer pasteID,
            @RequestBody(required = false) Paste paste)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        if (pasteID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("pasteID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        if (paste == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("Paste not Provided. Provide a valid paste as JSON")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }

        UpdatePasteRequest request = UpdatePasteRequest.newBuilder()
                .setUserID(userID)
                .setPasteID(pasteID)
                .setPaste(paste)
                .build();
        return ResponseEntity.ok(tampalService.updatePaste(request));
    }

    @DeleteMapping(path = "/paste/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletePaste(@RequestParam(required = false) Integer userID,
            @RequestParam(required = false) Integer pasteID)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        if (pasteID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("pasteID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        DeletePasteRequest request = DeletePasteRequest.newBuilder()
                .setUserID(userID)
                .setPasteID(pasteID)
                .build();
        return ResponseEntity.ok(tampalService.deletePaste(request));
    }

    @PostMapping(path = "/user/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@RequestBody(required = false) CreateUserRequest request)
    {
        if (request == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("User not Provided. Provide a valid user as JSON")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        return ResponseEntity.ok(tampalService.createUser(request));
    }

    @GetMapping(path = "/user/find", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@RequestParam(required = false) Integer userID)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("userID is required")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());

        }
        GetUserRequest request = GetUserRequest.newBuilder()
                .setUserID(userID)
                .build();
        return ResponseEntity.ok(tampalService.getUser(request));
    }

    // TODO add actual login logic
    @PostMapping(path = "/user/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody(required = false) Map<?, ?> userID)
    {
        if (userID == null)
        {
            return ResponseEntity.ok(APIResponse.newBuilder()
                    .setMessage("User not Provided. Provide a valid user as JSON")
                    .setCode(ResponseCode.INVALID_ARGUMENT)
                    .build());
        }
        ResponseCookie cookie = ResponseCookie.from("userID", userID.get("username").toString())
                .maxAge(60 * 60 * 24 * 365)
                .path("/")
                .httpOnly(true)
                .secure(true)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(APIResponse.newBuilder()
                        .setMessage("Login Successful")
                        .setCode(ResponseCode.OK)
                        .build());
    }
}
