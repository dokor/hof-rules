package fr.lelouet.webservices.front;

import com.coreoz.plume.jersey.security.permission.PublicApi;
import fr.lelouet.services.scores.enums.RulesSaison;
import fr.lelouet.services.scores.ScoresService;
import fr.lelouet.services.scores.beans.UserScore;
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
    @Operation(description = "Get top 500 by season")
    public List<UserScore> test(@Parameter(required = true) @PathParam("season") String season) {
        // todo : validator season
        if (season != null) {
            RulesSaison rulesSaison = RulesSaison.valueOf(season);
            return scoresService.getScores(rulesSaison);
        }
        throw new RuntimeException("NO SEASON"); // todo : exception
    }

    @POST
    @Path("/refresh")
    @Operation(description = "Refresh all Seasons")
    public void test() {
        scoresService.refresh();
    }
}
