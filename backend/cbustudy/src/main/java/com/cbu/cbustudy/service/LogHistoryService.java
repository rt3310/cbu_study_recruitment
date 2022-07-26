package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;

import java.util.List;

public interface LogHistoryService {
    LogHistory save(LogHistory logHistory);
    List<LogHistory> findAll();
    List<LogHistory> findByLogType(LogType logType);
    List<LogHistory> findByCategory(Category category);
    List<LogHistory> findByMemberId(Long memberId);
    LogHistory findById(Long id);
}
