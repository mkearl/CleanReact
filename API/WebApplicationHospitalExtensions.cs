using API.DTOS;
using Microsoft.AspNetCore.Mvc;
using MiniValidation;

public static class WebApplicationHospitalExtensions
{
    public static void MapHospitalEndpoints(this WebApplication app)
    {
        app.MapGet("/hospitals", (IHospitalRepository repo) => repo.GetAll())
            .Produces<HospitalDto[]>(StatusCodes.Status200OK);

        app.MapGet("/hospital/{hospitalId:int}", async (int hospitalId, IHospitalRepository repo) => 
        {
            var house = await repo.Get(hospitalId);
            if (house == null)
                return Results.Problem($"Hospital with ID {hospitalId} not found.", statusCode: 404);
            return Results.Ok(house);
        }).ProducesProblem(404).Produces<HospitalDetailDto>(StatusCodes.Status200OK);

        app.MapPost("/hospitals", async ([FromBody] HospitalDetailDto dto, IHospitalRepository repo) => 
        {
            if (!MiniValidator.TryValidate(dto, out var errors))
                return Results.ValidationProblem(errors);
            var newHospital = await repo.Add(dto);
            return Results.Created($"/hospital/{newHospital.Id}", newHospital);
        }).ProducesValidationProblem().Produces<HospitalDetailDto>(StatusCodes.Status201Created);

        app.MapPut("/hospitals", async ([FromBody] HospitalDetailDto dto, IHospitalRepository repo) => 
        {       
            if (!MiniValidator.TryValidate(dto, out var errors))
                return Results.ValidationProblem(errors);
            if (await repo.Get(dto.Id) == null)
                return Results.Problem($"Hospital with Id {dto.Id} not found", statusCode: 404);
            var updatedHospital = await repo.Update(dto);
            return Results.Ok(updatedHospital);
        }).ProducesValidationProblem().ProducesProblem(404).Produces<HospitalDetailDto>(StatusCodes.Status200OK);

        app.MapDelete("/hospitals/{hospitalId:int}", async (int hospitalId, IHospitalRepository repo) => 
        {
            if (await repo.Get(hospitalId) == null)
                return Results.Problem($"Hospital with Id {hospitalId} not found", statusCode: 404);
            await repo.Delete(hospitalId);
            return Results.Ok();
        }).ProducesProblem(404).Produces(StatusCodes.Status200OK);
    }
}