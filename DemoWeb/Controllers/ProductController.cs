using DemoWeb.Data;
using DemoWeb.Models;
using DemoWeb.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        //public ProductController(ProductService _productService)
        //{
        //    productService = _productService;
        //}
        public ProductController(MyDbContext context)
        {
            _context = context;
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
        public void AddProduct(Product product)
        {
            _context.Add(product);
            _context.SaveChanges();
        }
       
        [HttpPost]
        [Route("update/")]
        public void Update(Product product)
        {
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
