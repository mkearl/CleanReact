namespace API.DTOS;
using System.ComponentModel.DataAnnotations;

public record HospitalDetailDto(int Id, string? Name, string? Address, string? Country,
    string? Description, int Staff, string? Photo);