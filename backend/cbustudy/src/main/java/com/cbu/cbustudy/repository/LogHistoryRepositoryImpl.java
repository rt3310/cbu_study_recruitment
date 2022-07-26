package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Repository
@Transactional
@RequiredArgsConstructor
public class LogHistoryRepositoryImpl implements LogHistoryRepository{

    private final EntityManager em;

    @Override
    public LogHistory insert(LogHistory logHistory) {
        em.persist(logHistory);
        return logHistory;
    }

    @Override
    public List<LogHistory> selectAll() {
        return em.createQuery("SELECT lh FROM LogHistory lh", LogHistory.class).getResultList();
    }

    @Override
    public List<LogHistory> selectByLogType(LogType logType) {
        return selectAll().stream()
                .filter(logHistory -> logHistory.getLogType().equals(logType))
                .collect(Collectors.toList());
    }

    @Override
    public List<LogHistory> selectByCategory(Category category) {
        return selectAll().stream()
                .filter(logHistory -> logHistory.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    @Override
    public List<LogHistory> selectByMemberId(Long memberId) {
        return selectAll().stream()
                .filter(logHistory -> logHistory.getMember().getId() == memberId)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<LogHistory> selectById(Long id) {
        return Optional.ofNullable(em.find(LogHistory.class, id));
    }
}
