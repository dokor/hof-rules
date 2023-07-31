package fr.lelouet.services.scheduler;

import com.coreoz.wisp.Scheduler;
import com.coreoz.wisp.schedule.Schedules;
import fr.lelouet.services.configuration.ConfigurationService;
import fr.lelouet.services.scores.ScoresService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Duration;

@Singleton
public class ScheduledJobs {

    private final Scheduler scheduler;
    private final ScoresService scoresService;
    private final ConfigurationService configurationService;

    @Inject
    public ScheduledJobs(
        Scheduler scheduler,
        ScoresService scoresService,
        ConfigurationService configurationService
    ) {
        this.scheduler = scheduler;
        this.scoresService = scoresService;
        this.configurationService = configurationService;
    }

    public void scheduleJobs() {
        scheduler.schedule(
            "Raffraichissement du classement",
            scoresService::refresh,
            Schedules.fixedDelaySchedule(
                configurationService.getScheduleRefreshUsersTiming()
            )
        );
    }

}