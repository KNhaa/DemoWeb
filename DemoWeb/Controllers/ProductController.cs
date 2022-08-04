using DemoWeb.Data;
using DemoWeb.Models;
using DemoWeb.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        //private readonly ProductService productService;
        private readonly MyDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        //public ProductController(ProductService _productService)
        //{
        //    productService = _productService;
        //}
        public ProductController(MyDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        // GET: ProductController
        [HttpGet]
        public List<Product> GetAll()
        {
           // var productList = productService.getAll();
            return _context.Products.ToList(); ;
        }

        // GET: ProductController/Details/5
        [HttpGet("details/{id:int}")]
        public Product GetById(int id)
        {
           var productItem = _context.Products.Where(x => x.Id == id).FirstOrDefault();
            return productItem; 
        }

        [HttpPost]
        [Route("add/")]
        public void AddProduct([FromForm] Product product)
        {
            SaveImage(product);
            _context.Add(product);
            _context.SaveChanges();
            Console.WriteLine(product.UploadFile.FileName);
        }
        public void SaveImage(Product product)
        {
            var path = "uploadFile/";
            if (product.UploadFile != null)
            {
                string fileEx = "jpg";
                if (product.UploadFile.ContentType == "image/png") { fileEx = "png"; }
                else if (product.UploadFile.ContentType == "image/gif") { fileEx = "gif"; }
                else if (product.UploadFile.ContentType == "image/jpeg") { fileEx = "jpeg"; }
                path += String.Format("{0}.{1}", Guid.NewGuid().ToString(), fileEx);
                product.Image = path;
                string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, path);
                using (Stream fileStream = new FileStream(serverFolder, FileMode.Create))
                {
                    product.UploadFile.CopyTo(fileStream);
                }
            }
           
        }
        
       
        [HttpPost]
        [Route("update/")]
        public void Update([FromForm] Product product)
        {
            
            SaveImage(product);
            _context.Attach(product);
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
        }

        [HttpPost]
        [Route("delete/{id:int}")]
        public void Delete(int id)
        {
            var itemDelete = _context.Products.Find(id);
            _context.Remove(itemDelete);
            _context.SaveChanges();
        }

    }   
}
