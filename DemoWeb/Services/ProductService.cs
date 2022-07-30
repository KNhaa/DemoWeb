using DemoWeb.Data;
using DemoWeb.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoWeb.Services
{
    public class ProductService
    {
        private readonly MyDbContext _context;

        public ProductService(MyDbContext context)
        {
            _context = context;
        }

        public List<Product> getAll()
        {
            return _context.Products.ToList();
        }
        public Product getProductById(int id)
        {
            var product = _context.Products.Where(x => x.Id == id).FirstOrDefault();
                return product;
        }
        public void AddProduct(Product product)
        {
                _context.Add(product);
                _context.SaveChanges();
        }
        public void Update(Product product)
        {
           _context.Attach(product);
           _context.Entry(product).State = EntityState.Modified;
           _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var itemDelete= _context.Products.Find(id);
            _context.Remove(itemDelete);
            _context.SaveChanges();
        }

    }
}
