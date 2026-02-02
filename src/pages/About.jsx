import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  const TEAM_MEMBERS = [
    {
      name: 'Arjun Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format',
      bio: 'Passionate about bringing fresh, quality groceries to every home.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&auto=format',
      bio: 'Ensures seamless delivery and customer satisfaction across all operations.'
    },
    {
      name: 'Rahul Kumar',
      role: 'Quality Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format',
      bio: 'Maintains the highest standards of freshness and quality in our products.'
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format',
      bio: 'Dedicated to creating exceptional shopping experiences for our customers.'
    }
  ]

  const STATS = [
    { number: '50K+', label: 'Happy Customers', icon: 'fas fa-users' },
    { number: '1000+', label: 'Products', icon: 'fas fa-shopping-bag' },
    { number: '25+', label: 'Cities', icon: 'fas fa-map-marker-alt' },
    { number: '99.9%', label: 'Uptime', icon: 'fas fa-clock' }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              About <span className="text-gradient">FreshMart</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize grocery shopping by delivering the freshest, 
              highest-quality products directly to your doorstep with unmatched convenience.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format" 
              alt="Fresh Groceries"
              className="rounded-3xl shadow-2xl mx-auto max-w-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 2020, FreshMart began with a simple vision: to make fresh, 
                  quality groceries accessible to everyone, everywhere. What started as a 
                  small local delivery service has grown into a trusted platform serving 
                  thousands of families across multiple cities.
                </p>
                <p>
                  We believe that everyone deserves access to fresh, nutritious food without 
                  compromising on quality or convenience. Our team works tirelessly to source 
                  the best products from trusted farmers and suppliers, ensuring that every 
                  item meets our rigorous quality standards.
                </p>
                <p>
                  Today, we're proud to be at the forefront of the grocery delivery revolution, 
                  combining cutting-edge technology with old-fashioned values of quality, 
                  service, and community.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format" 
                alt="Our Story"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 dark:text-white">
            Our <span className="text-primary">Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Freshness First</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We prioritize freshness above all else, ensuring every product reaches you 
                at its peak quality and nutritional value.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Trust & Transparency</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We build lasting relationships through honest communication, fair pricing, 
                and transparent business practices.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We continuously innovate to improve your shopping experience through 
                technology and customer-centric solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 dark:text-white">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="card text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2 dark:text-white">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Experience Fresh?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust FreshMart for their grocery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Start Shopping
            </a>
            <a 
              href="#"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all"
            >
              <i className="fas fa-phone mr-2"></i>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About