package my.huda.tampal.controllers;

import my.huda.tampal.protos.TampalProtos.*;
import my.huda.tampal.service.TampalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HttpController
{
    @Autowired
    private TampalService tampalService;

    @PostMapping(path = "/v1/user/createPaste", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createPaste(@RequestBody CreatePasteRequest request)
    {
        return ResponseEntity.ok(tampalService.createPaste(request));
    }

    @PostMapping(path = "/v1/user/createUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest request)
    {
        return ResponseEntity.ok(tampalService.createUser(request));
    }

    @PostMapping(path = "/v1/user/deletePaste", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletePaste(@RequestBody DeletePasteRequest request)
    {
        return ResponseEntity.ok(tampalService.deletePaste(request));
    }

    @GetMapping(path = "/v1/user/getPaste", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPaste(@RequestBody GetPasteRequest request)
    {
        return ResponseEntity.ok(tampalService.getPaste(request));
    }

    @GetMapping(path = "/v1/user/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@RequestBody GetUserRequest request)
    {
        return ResponseEntity.ok(tampalService.getUser(request));
    }

    @PostMapping(path = "/v1/user/updatePaste", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatePaste(@RequestBody UpdatePasteRequest request)
    {
        return ResponseEntity.ok(tampalService.updatePaste(request));
    }
}
