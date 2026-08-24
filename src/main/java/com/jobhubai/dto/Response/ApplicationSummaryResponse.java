package com.jobhubai.dto.Response;

import lombok.Data;

@Data
public class ApplicationSummaryResponse {
    private int totalApplication;
    private int applied;
    private int shortListed;
    private int rejected;
    private int selected;
}
