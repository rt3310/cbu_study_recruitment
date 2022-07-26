package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;
import com.cbu.cbustudy.repository.LogHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LogHistoryServiceImpl implements LogHistoryService {

    private final LogHistoryRepository logHistoryRepository;

    @Override
    public LogHistory save(LogHistory logHistory) {
        return logHistoryRepository.insert(logHistory);
    }

    @Override
    public List<LogHistory> findAll() {
        return logHistoryRepository.selectAll();
    }

    @Override
    public List<LogHistory> findByLogType(LogType logType) {
        return logHistoryRepository.selectByLogType(logType);
    }

    @Override
    public List<LogHistory> findByCategory(Category category) {
        return logHistoryRepository.selectByCategory(category);
    }

    @Override
    public List<LogHistory> findByMemberId(Long memberId) {
        return logHistoryRepository.selectByMemberId(memberId);
    }

    @Override
    public LogHistory findById(Long id) {
        return logHistoryRepository.selectById(id).orElseThrow(() -> new IllegalArgumentException("해당 로그가 존재하지 않습니다."));
    }
}
