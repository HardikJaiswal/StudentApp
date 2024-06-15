using Newtonsoft.Json.Serialization;
using RepoDb;
using StudentApp.Contracts;
using StudentApp.Service;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetSection("ConnectionStrings")["DefaultConnection"];
// Add services to the container.
builder.Services.AddSingleton<IStudentService>(new StudentService(new DbService(connection)));
builder.Services.AddControllers();
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
}).AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});
SqlServerBootstrap.Initialize();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
