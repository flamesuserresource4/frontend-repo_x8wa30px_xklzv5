import { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function PremiumHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,83,18,0.15),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(20,20,20,0.25),transparent_40%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-28">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-amber-500">
              Vintage Clothier
            </h1>
            <p className="mt-4 text-lg text-zinc-300 max-w-xl">
              Bespoke suits, leather boots, fedoras, and refined essentials crafted for a timeless wardrobe.
              Personalize every detail — color, fabric, fit, pattern — by yourself or with the help of our stylist chatbot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#customizer" className="px-5 py-3 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition">Start Customizing</a>
              <a href="#recommend" className="px-5 py-3 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition">Get Recommendations</a>
            </div>
          </div>
          <div className="flex-1">
            <div className="aspect-[4/5] rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 border border-zinc-700 p-2">
              <div className="w-full h-full rounded-lg bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop)'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({label, children}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function Customizer() {
  const [category, setCategory] = useState('suit')
  const [color, setColor] = useState('')
  const [fabric, setFabric] = useState('')
  const [size, setSize] = useState('')
  const [fit, setFit] = useState('')
  const [pattern, setPattern] = useState('')
  const [auto, setAuto] = useState(true)
  const [est, setEst] = useState(null)
  const [loading, setLoading] = useState(false)

  const payload = useMemo(() => ({ category, color: color||undefined, fabric: fabric||undefined, size: size||undefined, fit: fit||undefined, pattern: pattern||undefined, auto }), [category, color, fabric, size, fit, pattern, auto])

  const onEstimate = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/customize`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      setEst(data)
    } catch (e) {
      setEst({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="customizer" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-amber-400">Customize Your Piece</h2>
      <p className="text-zinc-400 mt-1">Choose your category and details. Turn on Auto to let us complete premium selections for you.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Field label="Category">
          <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="suit">Suit</option>
            <option value="boots">Leather Boots</option>
            <option value="shoes">Leather Shoes</option>
            <option value="hat">Fedora Hat</option>
            <option value="belt">Leather Belt</option>
            <option value="shirt">Oxford Shirt</option>
            <option value="trousers">Trousers</option>
          </select>
        </Field>
        <Field label="Color">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" placeholder="e.g., Navy" value={color} onChange={e=>setColor(e.target.value)} />
        </Field>
        <Field label="Fabric">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" placeholder="e.g., Worsted Wool" value={fabric} onChange={e=>setFabric(e.target.value)} />
        </Field>
        <Field label="Size">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" placeholder="e.g., 40R or M" value={size} onChange={e=>setSize(e.target.value)} />
        </Field>
        <Field label="Fit">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" placeholder="e.g., Tailored" value={fit} onChange={e=>setFit(e.target.value)} />
        </Field>
        <Field label="Pattern">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" placeholder="e.g., Pinstripe" value={pattern} onChange={e=>setPattern(e.target.value)} />
        </Field>
        <div className="md:col-span-3 flex items-center gap-3">
          <input id="auto" type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)} />
          <label htmlFor="auto" className="text-zinc-300">Auto-complete premium configuration</label>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={onEstimate} className="px-5 py-3 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition" disabled={loading}>
          {loading ? 'Estimating...' : 'Estimate & Preview'}
        </button>
        <a href="#recommend" className="px-5 py-3 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition">See Recommendations</a>
      </div>
      {est && (
        <div className="mt-8 rounded-lg border border-zinc-700 p-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
          {est.error ? (
            <p className="text-red-400">{est.error}</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-amber-300">Suggested Configuration</h3>
                <pre className="mt-3 text-sm text-zinc-300 bg-black/30 p-4 rounded-md overflow-auto">{JSON.stringify(est.config, null, 2)}</pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-300">Estimated Price</h3>
                <p className="mt-3 text-3xl font-extrabold">${'{'}{est.est_price}{'}'}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function Recommender() {
  const [purpose, setPurpose] = useState('wedding')
  const [style, setStyle] = useState('vintage')
  const [category, setCategory] = useState('suit')
  const [budget, setBudget] = useState('1500')
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)

  const onRecommend = async () => {
    setLoading(true)
    try {
      const body = {
        purpose: purpose || undefined,
        style: style || undefined,
        category: category || undefined,
        budget: budget ? Number(budget) : undefined,
      }
      const res = await fetch(`${BACKEND}/recommendations`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
      const data = await res.json()
      setItems(data.recommendations || [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { onRecommend() }, [])

  return (
    <section id="recommend" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-amber-400">Curated Recommendations</h2>
      <p className="text-zinc-400 mt-1">Answer a few prompts and we’ll tailor a selection for you.</p>

      <div className="mt-6 grid md:grid-cols-4 gap-4">
        <Field label="Purpose">
          <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" value={purpose} onChange={e=>setPurpose(e.target.value)}>
            <option value="wedding">Wedding</option>
            <option value="business">Business</option>
            <option value="casual">Casual</option>
            <option value="black tie">Black Tie</option>
          </select>
        </Field>
        <Field label="Style">
          <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" value={style} onChange={e=>setStyle(e.target.value)}>
            <option value="vintage">Vintage</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="rugged">Rugged</option>
          </select>
        </Field>
        <Field label="Category">
          <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="suit">Suit</option>
            <option value="boots">Leather Boots</option>
            <option value="shoes">Leather Shoes</option>
            <option value="hat">Hat</option>
            <option value="belt">Belt</option>
            <option value="shirt">Shirt</option>
            <option value="trousers">Trousers</option>
          </select>
        </Field>
        <Field label="Budget (USD)">
          <input className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" value={budget} onChange={e=>setBudget(e.target.value)} />
        </Field>
      </div>

      <div className="mt-6">
        <button onClick={onRecommend} className="px-5 py-3 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition" disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items?.map((it, idx) => (
          <div key={idx} className="rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-950 to-zinc-900 p-6">
            <div className="aspect-[4/3] rounded-md bg-cover bg-center border border-zinc-700" style={{backgroundImage:'url(https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1200&auto=format&fit=crop)'}} />
            <h3 className="mt-4 text-xl font-semibold text-zinc-100">{it.title}</h3>
            <p className="text-sm text-zinc-400 capitalize">{it.category}</p>
            <p className="mt-3 text-2xl font-extrabold">${'{'}it.est_price{'}'}</p>
            <p className="mt-2 text-sm text-zinc-400">{it.rationale}</p>
            <details className="mt-3">
              <summary className="cursor-pointer text-amber-300">View suggested config</summary>
              <pre className="mt-2 text-xs text-zinc-300 bg-black/30 p-3 rounded-md overflow-auto">{JSON.stringify(it.suggested_config, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>
    </section>
  )
}

function StylistChat() {
  const [messages, setMessages] = useState([{ role:'assistant', content:'Hi! Tell me what you are looking for and I will curate the perfect vintage look.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const next = [...messages, { role:'user', content: input }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messages: next }) })
      const data = await res.json()
      setMessages([...next, { role:'assistant', content: data.reply || 'Here are some options.' }])
    } catch (e) {
      setMessages([...next, { role:'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-amber-400">Stylist Chat</h2>
      <div className="mt-6 rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-950 to-zinc-900 p-6">
        <div className="space-y-3 max-h-80 overflow-auto pr-2">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'assistant' ? 'text-amber-200' : 'text-zinc-200'}>
              <span className="text-xs uppercase tracking-wide text-zinc-500">{m.role}</span>
              <p className="mt-1 whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g., A navy suit for a summer wedding" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2" />
          <button onClick={send} disabled={loading} className="px-5 py-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition">{loading ? 'Thinking...' : 'Send'}</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500">© {new Date().getFullYear()} Vintage Clothier. All rights reserved.</p>
        <div className="text-zinc-400 text-sm">Made with premium materials and meticulous craftsmanship.</div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b0b0b_0%,#0d0d0d_60%,#111_100%)] text-zinc-100">
      <PremiumHero />
      <Customizer />
      <Recommender />
      <StylistChat />
      <Footer />
    </div>
  )
}

export default App
