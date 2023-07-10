package fr.lelouet.services.scheduler;

import com.coreoz.wisp.Scheduler;
import com.coreoz.wisp.schedule.Schedules;
import fr.lelouet.services.scores.ScoresService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Duration;

@Singleton
public class ScheduledJobs {

    private final Scheduler scheduler;
    private final ScoresService scoresService;

    @Inject
    public ScheduledJobs(
        Scheduler scheduler,
        ScoresService scoresService
    ) {
        this.scheduler = scheduler;
        this.scoresService = scoresService;
    }

    public void scheduleJobs() {
        scheduler.schedule(
            "Raffraichissement du classement",
            scoresService::refresh,
            Schedules.fixedDelaySchedule(Duration.ofHours(1))
        );
    }

}