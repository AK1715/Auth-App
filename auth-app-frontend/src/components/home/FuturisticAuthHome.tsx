"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const FuturisticAuthHome = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-4">🚀 Secure Auth 2.0</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Authentication Reimagined
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-zinc-400 text-lg"
          >
            Lightning-fast, secure, and developer-friendly authentication 
            for modern apps.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Live Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <motion.section
        className="py-24 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Passwordless Login",
              desc: "Magic links, OTPs, and biometrics."
            },
            {
              title: "Enterprise Security",
              desc: "OAuth, JWT, encryption built-in."
            },
            {
              title: "Plug & Play SDK",
              desc: "Works with React & Next.js instantly."
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-500 transition">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        className="py-24 px-6 bg-zinc-950"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {["Connect your app", "Configure auth", "Launch securely"].map((step, i) => (
            <motion.div key={i} variants={fadeUp}>
              <motion.div
                className="text-4xl font-bold text-purple-400 mb-4"
                whileHover={{ scale: 1.2 }}
              >
                {i + 1}
              </motion.div>
              <p className="text-zinc-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        className="py-24 px-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">
          Loved by Developers
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              quote: "This auth system saved us weeks of work!",
              name: "Aman Verma"
            },
            {
              quote: "Super clean UI and easy integration.",
              name: "Priya Shah"
            }
          ].map((t, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -5 }}>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <p className="text-zinc-300">“{t.quote}”</p>
                  <p className="mt-4 text-sm text-zinc-500">
                    — {t.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-32 text-center px-6 bg-gradient-to-r from-purple-600/20 to-cyan-600/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Start Securing Your App Today
        </h2>

        <p className="text-zinc-400 mb-8">
          Join thousands of developers building secure apps.
        </p>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Create Free Account
          </Button>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-zinc-500 border-t border-zinc-800">
        <p>© 2026 AuthX. All rights reserved.</p>
      </footer>

    </main>
  );
}

export default FuturisticAuthHome