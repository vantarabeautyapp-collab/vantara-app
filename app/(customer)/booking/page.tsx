'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft, CheckCircle, ChevronRight, Clock,
  Calendar, User, CreditCard, Smartphone, Crown
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn, formatDuration } from '@/lib/utils'

type BookingStep = 'service' | 'staff' | 'datetime' | 'payment' | 'confirmed'

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
]

const UNAVAILABLE_SLOTS = ['9:00 AM', '10:00 AM', '2:30 PM']

const CALENDAR_DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return d
})

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function BookingPage() {
  const business = BUSINESSES[0]
  const [step, setStep] = useState<BookingStep>('service')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const service = business.services.find(s => s.id === selectedService)
  const staff = business.staff.find(s => s.id === selectedStaff)

  const STEPS: BookingStep[] = ['service', 'staff', 'datetime', 'payment']
  const stepIndex = STEPS.indexOf(step)

  async function confirmBooking() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false)
    setStep('confirmed')
  }

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 pb-20">
        <div className="text-center w-full max-w-sm">
          <div className="w-20 h-20 rounded-full bg-emerald-brand/20 border-2 border-emerald-brand/40 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle size={36} className="text-emerald-light" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-text-muted text-sm mb-8">Your appointment has been booked. We&apos;ll send a reminder 1 hour before.</p>

          <div className="glass-card-gold rounded-2xl p-5 text-left mb-6">
            <div className="space-y-3">
              {[
                { label: 'Service', value: service?.name || '' },
                { label: 'With', value: staff?.name || 'Any available' },
                { label: 'Date', value: selectedDate?.toLocaleDateString('en-KE', { weekday: 'long', month: 'long', day: 'numeric' }) || '' },
                { label: 'Time', value: selectedTime || '' },
                { label: 'Total', value: `KSh ${service?.price.toLocaleString()}` },
                { label: 'Payment', value: paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'card' ? 'Card' : 'Airtel Money' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{label}</span>
                  <span className="text-sm font-medium text-text-primary">{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/20 mt-3 pt-3 flex items-center gap-2">
              <Crown size={13} className="text-gold" />
              <span className="text-xs text-gold">+{Math.floor((service?.price || 0) / 10)} Beauty Points earned!</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/home" className="w-full btn-gold rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
              Back to Home
            </Link>
            <Link href="/bookings" className="w-full btn-ghost rounded-xl py-3 text-sm flex items-center justify-center gap-2">
              View All Bookings
            </Link>
          </div>
        </div>
        <CustomerNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-border px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => {
              if (step === 'service') window.history.back()
              else setStep(STEPS[STEPS.indexOf(step) - 1])
            }}
            className="w-9 h-9 rounded-xl glass-card flex items-center justify-center"
          >
            <ArrowLeft size={17} className="text-text-secondary" />
          </button>
          <div className="flex-1">
            <div className="font-semibold text-text-primary text-sm">{business.name}</div>
            <div className="text-xs text-text-muted">Book Appointment</div>
          </div>
        </div>

        {/* Step progress */}
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn(
                'flex-1 h-1 rounded-full transition-all duration-300',
                i < stepIndex ? 'bg-emerald-light' : i === stepIndex ? 'bg-gold' : 'bg-surface-elevated'
              )}
            />
          ))}
        </div>
      </header>

      <div className="px-4 pt-4 space-y-5">
        {/* Booking summary card (shows after step 1) */}
        {stepIndex > 0 && service && (
          <div className="glass-card-gold rounded-xl px-4 py-3 border border-gold/20 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-xs">Selected:</span>
              <span className="font-semibold text-gold">{service.name} — KSh {service.price.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* STEP 1: SERVICE */}
        {step === 'service' && (
          <div className="animate-fade-up">
            <h2 className="font-playfair text-xl font-bold text-text-primary mb-1">Select a Service</h2>
            <p className="text-sm text-text-muted mb-4">Choose what you&apos;d like today</p>
            <div className="space-y-3">
              {business.services.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={cn(
                    'w-full text-left glass-card rounded-2xl p-4 border transition-all duration-200',
                    selectedService === s.id ? 'border-gold/40 bg-gold/5' : 'border-border hover:border-gold/25'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-text-primary">{s.name}</span>
                        {s.popular && <span className="text-xs px-1.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">Popular</span>}
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{s.description}</p>
                      <span className="text-xs text-text-secondary mt-1 block"><Clock size={9} className="inline mr-1" />{formatDuration(s.duration)}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-gold">KSh {s.price.toLocaleString()}</span>
                      {selectedService === s.id && <CheckCircle size={16} className="text-emerald-light" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: STAFF */}
        {step === 'staff' && (
          <div className="animate-fade-up">
            <h2 className="font-playfair text-xl font-bold text-text-primary mb-1">Choose Your Stylist</h2>
            <p className="text-sm text-text-muted mb-4">Select a specific staff member or choose &quot;Any Available&quot;</p>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedStaff('any')}
                className={cn(
                  'w-full text-left glass-card rounded-2xl p-4 border transition-all duration-200',
                  selectedStaff === 'any' ? 'border-gold/40 bg-gold/5' : 'border-border hover:border-gold/25'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center">
                    <User size={22} className="text-text-muted" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-text-primary">Any Available</div>
                    <div className="text-xs text-text-muted">Get the first available slot</div>
                  </div>
                  {selectedStaff === 'any' && <CheckCircle size={16} className="text-emerald-light ml-auto" />}
                </div>
              </button>
              {business.staff.map(member => (
                <button
                  key={member.id}
                  onClick={() => member.available && setSelectedStaff(member.id)}
                  disabled={!member.available}
                  className={cn(
                    'w-full text-left glass-card rounded-2xl p-4 border transition-all duration-200 disabled:opacity-50',
                    selectedStaff === member.id ? 'border-gold/40 bg-gold/5' : 'border-border hover:border-gold/25 disabled:hover:border-border'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image src={member.avatar} alt={member.name} width={48} height={48} className="rounded-full" />
                      <span className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface', member.available ? 'bg-emerald-light' : 'bg-text-muted')} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-text-primary">{member.name}</div>
                      <div className="text-xs text-text-muted">{member.role}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle size={10} className="text-gold fill-gold" />
                        <span className="text-xs text-text-secondary">{member.rating} · {member.reviewCount} reviews</span>
                      </div>
                    </div>
                    {!member.available && <span className="text-xs text-text-muted px-2 py-1 rounded-lg bg-surface-elevated">Busy</span>}
                    {selectedStaff === member.id && <CheckCircle size={16} className="text-emerald-light" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 'datetime' && (
          <div className="animate-fade-up">
            <h2 className="font-playfair text-xl font-bold text-text-primary mb-1">Pick a Date & Time</h2>
            <p className="text-sm text-text-muted mb-4">Select your preferred slot</p>

            {/* Date selector */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={15} className="text-gold" />
                <span className="text-sm font-semibold text-text-primary">Date</span>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {CALENDAR_DAYS.map((day, i) => {
                  const isSelected = selectedDate?.toDateString() === day.toDateString()
                  const isToday = i === 0
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        'flex flex-col items-center gap-1 shrink-0 w-14 py-2.5 px-1 rounded-xl border transition-all duration-150',
                        isSelected
                          ? 'bg-gold/15 border-gold/40 text-gold'
                          : 'border-border text-text-muted hover:border-gold/25 hover:text-text-secondary'
                      )}
                    >
                      <span className="text-xs">{DAY_LABELS[day.getDay()]}</span>
                      <span className={cn('font-bold text-sm', isSelected ? 'text-gold' : 'text-text-primary')}>{day.getDate()}</span>
                      {isToday && <span className="text-xs">Today</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={15} className="text-gold" />
                  <span className="text-sm font-semibold text-text-primary">Available Times</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(time => {
                    const unavailable = UNAVAILABLE_SLOTS.includes(time)
                    const selected = selectedTime === time
                    return (
                      <button
                        key={time}
                        onClick={() => !unavailable && setSelectedTime(time)}
                        disabled={unavailable}
                        className={cn(
                          'py-2.5 rounded-xl text-xs font-medium border transition-all duration-150',
                          selected ? 'bg-gold/15 border-gold/40 text-gold' :
                          unavailable ? 'border-border text-text-muted opacity-40 cursor-not-allowed line-through' :
                          'border-border text-text-secondary hover:border-gold/30 hover:text-text-primary'
                        )}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Notes (optional)</label>
              <textarea
                className="input-dark resize-none h-20 text-sm"
                placeholder="Any special requests or notes for your stylist..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT */}
        {step === 'payment' && service && (
          <div className="animate-fade-up">
            <h2 className="font-playfair text-xl font-bold text-text-primary mb-1">Payment</h2>
            <p className="text-sm text-text-muted mb-4">Choose your payment method</p>

            {/* Order summary */}
            <div className="glass-card rounded-2xl p-4 border border-border mb-5">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Order Summary</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">{service.name}</span>
                  <span className="text-text-primary">KSh {service.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-text-muted">
                  <span>with {staff?.name || 'Any available'}</span>
                  <span>{selectedDate?.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} · {selectedTime}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-light pt-2 border-t border-border">
                  <span>Beauty Points earned</span>
                  <span>+{Math.floor(service.price / 10)} pts</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-base text-text-primary pt-3 border-t border-border mt-2">
                <span>Total</span>
                <span className="gold-text">KSh {service.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="space-y-3">
              {[
                { id: 'mpesa', label: 'M-Pesa', sub: 'Pay with mobile money', icon: Smartphone, popular: true },
                { id: 'airtel', label: 'Airtel Money', sub: 'Airtel mobile payment', icon: Smartphone },
                { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex', icon: CreditCard },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-150 text-left',
                    paymentMethod === method.id ? 'border-gold/40 bg-gold/5' : 'glass-card border-border hover:border-gold/25'
                  )}
                >
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                    paymentMethod === method.id ? 'bg-gold/15' : 'bg-surface-elevated'
                  )}>
                    <method.icon size={20} className={paymentMethod === method.id ? 'text-gold' : 'text-text-muted'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text-primary">{method.label}</span>
                      {method.popular && <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-brand/20 text-emerald-light">Popular</span>}
                    </div>
                    <div className="text-xs text-text-muted">{method.sub}</div>
                  </div>
                  {paymentMethod === method.id && <CheckCircle size={16} className="text-gold shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[#0A0A0A] to-transparent">
        {step === 'payment' ? (
          <button
            onClick={confirmBooking}
            disabled={loading}
            className="w-full btn-gold rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Confirming...
              </span>
            ) : (
              <>Confirm & Pay KSh {service?.price.toLocaleString()} <ChevronRight size={18} /></>
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              if (step === 'service' && !selectedService) return
              if (step === 'staff' && !selectedStaff) return
              if (step === 'datetime' && (!selectedDate || !selectedTime)) return
              setStep(STEPS[STEPS.indexOf(step) + 1])
            }}
            className="w-full btn-gold rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2"
          >
            Continue <ChevronRight size={18} />
          </button>
        )}
      </div>

      <CustomerNav />
    </div>
  )
}
