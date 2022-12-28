using API.Data;
using API.DTOS;
using Microsoft.EntityFrameworkCore;

public interface IHospitalRepository
{
    Task<List<HospitalDto>> GetAll();
    Task<HospitalDetailDto?> Get(int id);
    Task<HospitalDetailDto> Add(HospitalDetailDto hospital);
    Task<HospitalDetailDto> Update(HospitalDetailDto hospital);
    Task Delete(int id);
}

public class HospitalRepository : IHospitalRepository
{
    private readonly HospitalDbContext context;

    private static HospitalDetailDto EntityToDetailDto(HospitalEntity e)
    {
        return new HospitalDetailDto(e.Id, e.Name, e.Address, e.Country, e.Description, e.Staff, e.Photo);
    }

    private static void DtoToEntity(HospitalDetailDto dto, HospitalEntity e)
    {
        e.Name = dto.Name;
        e.Address = dto.Address;
        e.Country = dto.Country;
        e.Description = dto.Description;
        e.Staff = dto.Staff;
        e.Photo = dto.Photo;
    }

    public HospitalRepository(HospitalDbContext context)
    {
        this.context = context;
    }

    public async Task<List<HospitalDto>> GetAll()
    {
        return await context.Hospitals.Select(e => new HospitalDto(e.Id, e.Name, e.Address, e.Country, e.Staff)).ToListAsync();
    }

    public async Task<HospitalDetailDto?> Get(int id)
    {
        var entity = await context.Hospitals.SingleOrDefaultAsync(h => h.Id == id);
        if (entity == null)
            return null;
        return EntityToDetailDto(entity);
    }

    public async Task<HospitalDetailDto> Add(HospitalDetailDto dto)
    {
        var entity = new HospitalEntity();
        DtoToEntity(dto, entity);
        context.Hospitals.Add(entity);
        await context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task<HospitalDetailDto> Update(HospitalDetailDto dto)
    {
        var entity = await context.Hospitals.FindAsync(dto.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to update house: entity with ID {dto.Id} not found.");
        DtoToEntity(dto, entity);
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await context.Hospitals.FindAsync(id);
        if (entity == null)
            throw new ArgumentException($"Trying to delete house: entity with ID {id} not found.");
        context.Hospitals.Remove(entity);
        await context.SaveChangesAsync();
    }
}