package com.jobhubai.controller;

import com.jobhubai.Service.ResumeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // =========================
    // UPLOAD RESUME
    // =========================

    @PostMapping("/upload/resume")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        try {

            String filename = resumeService.saveFile(
                    file,
                    "resume",
                    authentication.getName()
            );

            return ResponseEntity.ok(
                    "PDF uploaded successfully: " + filename
            );

        } catch (IOException e) {

            return ResponseEntity.badRequest()
                    .body("Failed to upload PDF: " + e.getMessage());
        }
    }



    @PostMapping("/upload/image")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        try {

            String filename = resumeService.saveFile(
                    file,
                    "image",
                    authentication.getName()
            );

            return ResponseEntity.ok(
                    "Image uploaded successfully: " + filename
            );

        } catch (IOException e) {

            return ResponseEntity.badRequest()
                    .body("Failed to upload image: " + e.getMessage());
        }
    }


    // =========================
    // DOWNLOAD RESUME
    // =========================

    @GetMapping("/download/getresume/{filename}")
    public ResponseEntity<byte[]> getPdf(
            @PathVariable String filename) {

        try {

            byte[] fileData =
                    resumeService.getFile(filename);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + filename + "\""
                    )
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(fileData);

        } catch (IOException e) {

            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("update/resume")
    public ResponseEntity<String> updateResume(@RequestParam("file")MultipartFile file,Authentication authentication)
    {
        try {
            String userName= authentication.getName();
            resumeService.updateResume(file,userName);
            return ResponseEntity.ok("File Updated Sucessfully:");
        }
        catch (IOException e)
        {
            return ResponseEntity.badRequest().body("File cannot be uploaded");
        }
    }
    @DeleteMapping("delete/resume")
    public ResponseEntity<String> deleteResume(Authentication authentication)
    {
        try {
            resumeService.deleteResume(authentication.getName());
            return ResponseEntity.ok("Resume Deleted SucessFully");
        }
        catch (IOException e)
        {
            return ResponseEntity.badRequest().body("File cannot be deleted");
        }



    }
}