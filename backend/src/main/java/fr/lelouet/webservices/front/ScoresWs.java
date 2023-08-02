package fr.lelouet.webservices.front;

import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import fr.lelouet.services.scores.ScoresService;
import fr.lelouet.services.scores.beans.UserScore;
import fr.lelouet.services.scores.enums.RulesScoreType;
import fr.lelouet.webservices.internal.HofWsError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.Instant;
import java.util.List;

@Path("/scores")
@Tag(name = "scores", description = "Manage scores web-services")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class ScoresWs {

    private final ScoresService scoresService;

    @Inject
    public ScoresWs(
        ScoresService scoresService
    ) {
        this.scoresService = scoresService;
    }

    @GET
    @Path("/season/{season}")
    @Operation(description = "Get Scores by season")
    public List<UserScore> get(@Parameter(required = true) @PathParam("season") String season) {
        this.validateSeason(season);
        RulesScoreType rulesSaison = RulesScoreType.valueOf(season);
        return scoresService.getScores(rulesSaison);
    }

    @POST
    @Path("/refresh")
    @Operation(description = "Refresh all Seasons")
    public Instant refreshSeasonsScores() {
        return scoresService.refresh();
    }

    @GET
    @Path("/refresh/last-update")
    @Operation(description = "Return the time of the last update of score cache")
    public Instant getRefreshLastUpdate(){
        return scoresService.getLastUpdateInstant();
    }

    /**
     * Validator for season
     * @param season
     */
    private void validateSeason(String season) {
        if (season == null) {
            throw new WsException(HofWsError.NO_SEASON_SELECTED);
        }
    }
}
