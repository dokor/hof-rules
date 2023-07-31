package fr.lelouet.services.configuration;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.typesafe.config.Config;

import java.time.Duration;

@Singleton
public class ConfigurationService {

	private final Config config;

	@Inject
	public ConfigurationService(Config config) {
		this.config = config;
	}

	public String swaggerAccessUsername() {
		return config.getString("swagger.access.username");
	}

	public String swaggerAccessPassword() {
		return config.getString("swagger.access.password");
	}

    public Integer getNumberOfUsersShow() {
		return config.getInt("show.number-of-users");
    }
    public Duration getScheduleRefreshUsersTiming() {
		return config.getDuration("schedule.jobs.refresh-users.timing");
    }
}

