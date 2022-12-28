using API.Data;
using Microsoft.EntityFrameworkCore;

public static class SeedData
{
    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<HospitalEntity>().HasData(new List<HospitalEntity> {
            new HospitalEntity {
                Id = 1,
                Name = "Baylor Scott & White Medical",
                Address = "7502 Greenville Avenue Dallas, TX  75231",
                Country = "USA",
                Description = "Short Term Acute Care http://www.advanceddallas.com/",
                Staff = 90000
            },
            new HospitalEntity
            {
                Id = 2,
                Name = "Baylor Scott Medical City",
                Address = "2727 East Lemmon Ave. Dallas, TX  75204",
                Country = "USA",
                Description = "Short Term Acute Care http://www.advanceddallas.com/",
                Staff = 102
            },
            new HospitalEntity
            {
                Id = 3,
                Name = "A1 Medical",
                Address = "123 North 83rd Street, Monarch, OH 83833",
                Country = "USA",
                Description = "Short Term Acute Care http://www.advanceddallas.com/",
                Staff = 245000
            },
            new HospitalEntity
            {
                Id = 4,
                Name = "Kindred Hospital Dallas Central",
                Address = "123 Dallas Texas",
                Country = "USA",
                Description = "Discreetly situated hin the mall.  We can easily take care of your medical needs",
                Staff = 990000
            },
            new HospitalEntity
            {
                Id = 5,
                Name = "Medical Charlton  - Emergency",
                Address = "145 North Hemmingway St.",
                Country = "USA",
                Description = "We provide extensive medical services for both adults and children.",
                Staff = 2000000
            }
        });
        
    }
}