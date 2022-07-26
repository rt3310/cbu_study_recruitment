package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;

import java.util.List;
import java.util.Optional;

public interface LogHistoryRepository {
    LogHistory insert(LogHistory logHistory);
    List<LogHistory> selectAll();
    List<LogHistory> selectByLogType(LogType logType);
    List<LogHistory> selectByCategory(Category category);
    List<LogHistory> selectByMemberId(Long memberId);
    Optional<LogHistory> selectById(Long id);
}
