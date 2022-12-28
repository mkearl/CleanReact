namespace API.Data;

public class HospitalEntity
{
     public int Id { get; set; }
     
     public string? Name { get; set; }
     public string? Address { get; set; }
     
     public string? Country { get; set; }
     
     public string? Description { get; set; }
     
     public int Staff { get; set; }
     
     public string? Photo { get; set; }
}