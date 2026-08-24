package com.jobhubai.Service;

import com.jobhubai.Repository.ResumeRepo;
import com.jobhubai.Repository.UserRepo;
import com.jobhubai.entity.Resume;
import com.jobhubai.entity.User;
import com.jobhubai.exception.NotFound;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ResumeService {

    private final UserRepo repo;
    private final ResumeRepo rep;

    private final Path rootLocation = Paths.get("Uploads");

    public ResumeService(UserRepo repo, ResumeRepo rep) throws IOException {

        this.repo = repo;
        this.rep = rep;

        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }
    }

    // =========================
    // SAVE RESUME / IMAGE
    // =========================

    public String saveFile(
            MultipartFile file,
            String fileType,
            String userName) throws IOException {

        String extension =
                getFileExtension(file.getOriginalFilename());

        String fileName =
                UUID.randomUUID().toString() + "." + extension;

        User user = repo.findByUsername(userName);

        if (user == null) {
            throw new NotFound("User not found");
        }

        if (fileType.equalsIgnoreCase("resume")
                && !"pdf".equalsIgnoreCase(extension)) {

            throw new IOException("Invalid PDF file type");
        }

        if (fileType.equalsIgnoreCase("image")
                && !isValidImageFile(extension)) {

            throw new IOException("Invalid image file type");
        }

        Resume resume = new Resume();

        resume.setFileName(fileName);
        resume.setFilePath("Uploads/" + fileName);
        resume.setFileType(fileType);
        resume.setUser(user);

        Files.copy(
                file.getInputStream(),
                rootLocation.resolve(fileName)
        );

        rep.save(resume);

        return fileName;
    }

    // =========================
    // GET FILE
    // =========================

    public byte[] getFile(String filename) throws IOException {

        Path filePath =
                rootLocation.resolve(filename);

        return Files.readAllBytes(filePath);
    }

    // =========================
    // UPDATE RESUME
    // =========================

    public void updateResume(
            MultipartFile file,
            String userName) throws IOException {

        User user = repo.findByUsername(userName);

        if (user == null) {
            throw new NotFound("User not found");
        }

        Resume resume = rep.findByUser(user);

        if (resume == null) {
            throw new NotFound("Resume not found");
        }

        deleteResume(userName);

        saveFile(
                file,
                "resume",
                userName
        );
    }

    // =========================
    // DELETE RESUME
    // =========================

    public void deleteResume(String name)
            throws IOException {

        User user = repo.findByUsername(name);

        if (user == null) {
            throw new NotFound("User not found");
        }

        Resume resume = rep.findByUser(user);

        if (resume == null) {
            throw new NotFound("Resume not found");
        }

        Path filePath =
                rootLocation.resolve(
                        resume.getFileName()
                );

        Files.deleteIfExists(filePath);

        rep.delete(resume);
    }

    // =========================
    // FILE EXTENSION
    // =========================

    private String getFileExtension(
            String originalFilename) {

        return originalFilename.substring(
                originalFilename.lastIndexOf(".") + 1
        );
    }

    // =========================
    // IMAGE VALIDATION
    // =========================

    private boolean isValidImageFile(
            String extension) {

        return "jpg".equalsIgnoreCase(extension)
                || "jpeg".equalsIgnoreCase(extension);
    }
}