"use client";

import { Info, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const termDataData: Record<string, any> = {
  "Fall - 2023": {
    termTitle: "Fall 2023", dueDate: "8/16/2023", credits: "14.0", holds: "$0.00",
    totalCharges: "$8,345.01", totalPayments: "$8,345.01CR", totalBalance: "$0.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$196.50" },
      { id: 2, desc: "PIRG", amount: "$13.01" },
      { id: 3, desc: "STUDENT FEE", amount: "$1,104.00" },
      { id: 4, desc: "SCHOOL FEE", amount: "$155.50" },
      { id: 5, desc: "NK FALL TRANSFER", amount: "$39.00" },
      { id: 6, desc: "TUITION", amount: "$6,837.00" }
    ],
    payments: [
      { id: 1, desc: "REFUND - 02/02", amount: "$2,683.00" },
      { id: 2, desc: "RUTP PAYMENT - 10/16", amount: "$5,584.01CR" },
      { id: 3, desc: "PAYMENT - 12/08", amount: "$2,722.00CR" },
      { id: 4, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$990.00CR" },
      { id: 5, desc: "Federal Direct Loan -\nSubsidized", amount: "$1,732.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$8,345.01" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Spring - 2024": {
    termTitle: "Spring 2024", dueDate: "2/07/2024", credits: "12.0", holds: "$0.00",
    totalCharges: "$8,306.01", totalPayments: "$8,306.01CR", totalBalance: "$0.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$196.50" },
      { id: 2, desc: "PIRG", amount: "$13.01" },
      { id: 3, desc: "STUDENT FEE", amount: "$1,104.00" },
      { id: 4, desc: "SCHOOL FEE", amount: "$155.50" },
      { id: 5, desc: "NK SPRING TRANSFER", amount: "$39.00CR" },
      { id: 6, desc: "TUITION", amount: "$6,837.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$39.00" }
    ],
    payments: [
      { id: 1, desc: "RUTP PAYMENT - 01/15", amount: "$5,584.01CR" },
      { id: 2, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$990.00CR" },
      { id: 3, desc: "Federal Direct Loan -\nSubsidized", amount: "$1,732.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$8,306.01" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Fall - 2024": {
    termTitle: "Fall 2024", dueDate: "9/06/2024", credits: "9.0", holds: "$0.00",
    totalCharges: "$4,933.94", totalPayments: "$4,251.94CR", totalBalance: "$682.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$182.00" },
      { id: 2, desc: "PIRG", amount: "$6.50" },
      { id: 3, desc: "STUDENT FEE", amount: "$342.50" },
      { id: 4, desc: "COURSE/OTHER FEES", amount: "$31.00" },
      { id: 5, desc: "SCHOOL FEE", amount: "$93.00" },
      { id: 6, desc: "TUITION", amount: "$4,131.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$147.94" }
    ],
    payments: [
      { id: 1, desc: "REFUND - 02/18", amount: "$1.00" },
      { id: 2, desc: "PAYMENT - 09/19", amount: "$2,211.94CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$1,900.00CR" },
      { id: 4, desc: "Federal Direct Loan -\nSubsidized", amount: "$141.00CR" }
    ]
  },
  "Spring - 2025": {
    termTitle: "Spring 2025", dueDate: "1/15/2025", credits: "9.0", holds: "$0.00",
    totalCharges: "$4,755.00", totalPayments: "$4,074.00CR", totalBalance: "$681.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$182.00" },
      { id: 2, desc: "PIRG", amount: "$6.50" },
      { id: 3, desc: "STUDENT FEE", amount: "$342.50" },
      { id: 4, desc: "SCHOOL FEE", amount: "$93.00" },
      { id: 5, desc: "TUITION", amount: "$4,131.00" }
    ],
    payments: [
      { id: 1, desc: "TERM BILL PAYMENT - 03/09", amount: "$1,043.00CR" },
      { id: 2, desc: "Federal Direct Loan -\nSubsidized", amount: "$142.00CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$2,889.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$4,755.00" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Fall - 2025": {
    termTitle: "Fall 2025", dueDate: "9/05/2025", credits: "10.0", holds: "$0.00",
    totalCharges: "$6,895.99", totalPayments: "$6,895.99CR", totalBalance: "$0.00",
    showFinAid: true, showPaymentOptions: true,
    charges: [
      { id: 1, desc: "PRIOR YEAR BALANCE", amount: "$1,363.00" },
      { id: 2, desc: "TECHNOLOGY FEE", amount: "$199.50" },
      { id: 3, desc: "PIRG", amount: "$6.50" },
      { id: 4, desc: "STUDENT FEE", amount: "$359.50" },
      { id: 5, desc: "SCHOOL FEE", amount: "$97.50" },
      { id: 6, desc: "TUITION", amount: "$4,820.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$49.99" }
    ],
    payments: [
      { id: 1, desc: "PAYMENT - 08/11", amount: "$1,363.00CR" },
      { id: 2, desc: "PAYMENT - 11/17", amount: "$2,316.99CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$3,216.00CR" }
    ]
  },
  "Summer - 2026": {
    termTitle: "Summer 2026", dueDate: "TBD", credits: "TBD", holds: "$0.00",
    totalCharges: "$10,015.00", totalPayments: "$3,728.00CR", totalBalance: "$6,287.00",
    showPaymentOptions: true, showPayBillButtons: true,
    charges: [
      { id: 1, desc: "TUITION", amount: "$6,266.00" },
      { id: 2, desc: "STUDENT FEE", amount: "$162.00" },
      { id: 3, desc: "COURSE FEE", amount: "$20.00" },
      { id: 4, desc: "PRIOR YEAR BALANCE", amount: "$3,567.00" }
    ],
    payments: [
      { id: 1, desc: "FINANCIAL AID - 8/17", amount: "$161.00CR" },
      { id: 2, desc: "PRIOR YEAR AID", amount: "$2,000.00CR" },
      { id: 3, desc: "PRIOR YEAR AID", amount: "$1,567.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$10,015.00" }
  },
  "Fall - 2026": {
    termTitle: "Fall 2026", dueDate: "TBD", credits: "TBD", holds: "$0.00",
    totalCharges: "$17,808.48", totalPayments: "$8,781.00CR", totalBalance: "$9,027.48",
    showPaymentOptions: true, showPayBillButtons: true,
    charges: [
      { id: 1, desc: "PRIOR YEAR BALANCE", amount: "$8,288.00" },
      { id: 2, desc: "TECHNOLOGY FEE", amount: "$221.00" },
      { id: 3, desc: "PIRG", amount: "$13.01" },
      { id: 4, desc: "STUDENT FEE", amount: "$1,242.00" },
      { id: 5, desc: "SCHOOL FEE", amount: "$174.50" },
      { id: 6, desc: "TUITION", amount: "$7,690.97" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$179.47" }
    ],
    payments: [
      { id: 1, desc: "Federal Direct Loan -\nSubsidized OFFERED", amount: "$414.00CR" },
      { id: 2, desc: "Federal Direct Loan -\nUnsubsidized OFFERED", amount: "$3,296.00CR" },
      { id: 3, desc: "PRIOR YEAR AID DSUB - 07/23", amount: "$141.00CR" },
      { id: 4, desc: "PRIOR YEAR AID DUNSB - 07/23", amount: "$1,899.00CR" },
      { id: 5, desc: "PRIOR YEAR AID DUNSB - 07/23", amount: "$2,889.00CR" },
      { id: 6, desc: "PRIOR YEAR AID DSUB - 07/23", amount: "$142.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$17,808.48" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  }
};

export default function TermBillPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Term Selection");
  const [semester, setSemester] = useState("Fall - 2025");
  const [selectedTermData, setSelectedTermData] = useState<any>(null);

  const semesters = [
    "Fall - 2026", "Summer - 2026", "Winter - 2026", "Fall - 2025",
    "Spring - 2025", "Fall - 2024", "Spring - 2024", "Fall - 2023",
    "Spring - 2023", "Fall - 2022"
  ];

  const handleContinue = () => {
    const data = termDataData[semester] || {
      termTitle: semester.replace(" - ", " "), dueDate: "TBD", credits: "0.0", holds: "$0.00",
      totalCharges: "$0.00", totalPayments: "$0.00CR", totalBalance: "$0.00", charges: [], payments: []
    };
    setSelectedTermData(data);
    setActiveTab("Account Summary");
  };

  const continueToOnlinePayment = () => {
    if (!selectedTermData) return;
    const amount = selectedTermData.totalBalance.replace(/[$,]/g, "");
    router.push(`/make-payment?amount=${encodeURIComponent(amount)}&term=${encodeURIComponent(selectedTermData.termTitle)}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      <div className="sticky top-0 z-50 bg-amber-600 px-8 py-3 text-center font-bold text-white">
        SERVICE NOTICE: Some dashboard features may be temporarily unavailable or may not display correctly while maintenance is completed. The payment gateway is fully operational.
      </div>

      <header className="bg-[#cc0033] px-8 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-serif font-bold tracking-tighter">R</span>
            <span className="text-2xl font-bold tracking-widest mt-2">RUTGERS</span>
          </div>
          <div className="mt-2 border-l-2 border-white/40 pl-6">
            <p className="text-sm font-medium tracking-wide">Student Accounting, Billing, and Cashier Services</p>
            <h1 className="text-2xl font-bold">Student Account</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl min-h-[600px] pb-12">
        <div className="flex border-b border-gray-300 text-sm font-medium">
          {["Term Selection", "Account Summary", "Payment Adjustments", "Verify Payment Adjustments"].map((tab) => (
            <div
              key={tab}
              className={`px-6 py-3 cursor-pointer ${activeTab === tab ? 'bg-[#555555] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
              onClick={() => {
                if (tab === "Term Selection" || selectedTermData) setActiveTab(tab);
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="border-t-4 border-[#cc0033] bg-white shadow min-h-[500px]">
          {activeTab === "Term Selection" && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 p-8">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute right-0 top-0 flex items-center gap-1 text-sm font-semibold text-slate-700"><HelpCircle className="h-4 w-4" /> help</div>
                  <h2 className="text-3xl font-light text-slate-800">Choose Semester</h2>
                </div>
                <div className="mt-8 text-sm font-medium text-slate-700">
                  <p className="mb-4">View Student Account for TARUN TATA</p>
                  <div className="flex items-start gap-4 mt-6">
                    <div className="relative w-48">
                      <select
                        className="w-full cursor-pointer appearance-none border border-slate-400 bg-white px-3 py-2 text-[15px] font-normal text-slate-800"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                      >
                        {semesters.map((term) => <option key={term} value={term}>{term}</option>)}
                      </select>
                    </div>
                    <button className="bg-[#0088ff] px-6 py-2 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-600" onClick={handleContinue}>Continue</button>
                  </div>
                </div>
              </div>

              <div className="space-y-8 p-8 pt-0">
                <section>
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-medium text-[#cc0033]"><Info className="h-6 w-6 rounded-full bg-[#cc0033] text-white p-1" /> Financial Responsibility Statement</h3>
                  <div className="space-y-4 text-[15px] leading-relaxed text-slate-800">
                    <p>By clicking <strong>Continue</strong> to view my student account, I acknowledge that I understand, and agree to the following terms and Conditions of the Financial Responsibility Statement.</p>
                    <p>By registering for class(es), I acknowledge that I am agreeing to the following terms and conditions. I understand that I am signing a legally binding contract to pay all tuition and fees assessed to my student account and all additional costs and expenses related to my enrollment at Rutgers University...</p>
                    <button className="flex items-center text-[#cc0033] hover:underline font-medium"><ChevronRight className="h-4 w-4" /> Show more info</button>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === "Account Summary" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                <div className="text-center mb-6">
                  <h2 className="text-[17px] text-slate-800 font-normal">Account Summary - NEWARK COLLEGE OF ARTS & SCIENCES - {selectedTermData.termTitle}</h2>
                  <p className="text-[17px] text-slate-800 font-normal mt-1">TARUN TATA / 222007507</p>
                </div>

                <div className="bg-[#d2ebef] mb-8 p-6 pl-8 border-l-[6px] border-[#005b6b]">
                  <h3 className="flex items-center text-[19px] gap-2 text-[#005b6b] mb-4"><Info className="h-5 w-5 bg-[#005b6b] text-white rounded-full p-[2px]" /> Your Student Account Status</h3>
                  <ul className="space-y-1 pl-7 list-disc text-[#005b6b] text-[15px]">
                    <li>Term Bill has been received.</li>
                    <li>Your Term Bill is due on {selectedTermData.dueDate}.</li>
                    <li>Financial Holds {selectedTermData.holds}</li>
                    <li>Term Billable Credit Hours {selectedTermData.credits}</li>
                  </ul>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1 bg-white border-t-[3px] border-[#cc0033] shadow-sm">
                    <div className="p-5 pb-0 flex justify-between items-start">
                      <h3 className="text-[22px] font-normal text-slate-800">Outstanding Balance</h3>
                      <button className="flex items-center gap-1 text-sm font-semibold text-slate-700"><HelpCircle className="h-4 w-4" /> help</button>
                    </div>
                    <div className="px-5 py-4 space-y-2 text-[14px]">
                      <div className="flex justify-between text-slate-700"><span>Total Charges</span><span>{selectedTermData.totalCharges}</span></div>
                      <div className="flex justify-between text-slate-700"><span>Total Payments</span><span>{selectedTermData.totalPayments}</span></div>
                    </div>
                    <div className="bg-black text-white px-5 py-2.5 flex justify-between font-bold text-[15px]"><span>Total Balance:</span><span>{selectedTermData.totalBalance}</span></div>
                    <div className="px-4 py-4">
                      <div className="grid grid-cols-2 text-[13px] font-bold text-black border-b border-slate-300 pb-2 mb-2"><div>Charges</div><div className="text-center">Payments / Account Credits</div></div>
                      <div className="flex gap-4 min-h-[140px]">
                        <div className="flex-1 space-y-1 text-[13px]">
                          {selectedTermData.charges.map((c: any) => <div key={c.id} className="flex justify-between text-slate-700"><span className="uppercase">{c.desc}</span><span className="text-right">{c.amount}</span></div>)}
                        </div>
                        <div className="flex-1 space-y-1 text-[13px]">
                          {selectedTermData.payments.map((p: any) => <div key={p.id} className="flex justify-between text-slate-700 items-start"><span className="whitespace-pre-line leading-tight">{p.desc}</span><span className="text-right">{p.amount}</span></div>)}
                        </div>
                      </div>
                      {(selectedTermData.feesLine || selectedTermData.insuranceLine) && (
                        <div className="border-t border-slate-200 mt-4 pt-2 mb-2 space-y-1 text-[13px]">
                          {selectedTermData.feesLine && <div className="flex w-1/2 justify-between pr-2 text-slate-700"><span>{selectedTermData.feesLine.label}</span><span>{selectedTermData.feesLine.amount}</span></div>}
                          {selectedTermData.insuranceLine && <div className="flex w-1/2 justify-between pr-2 text-[#cc0033]"><span>{selectedTermData.insuranceLine.label}</span><span>{selectedTermData.insuranceLine.amount}</span></div>}
                        </div>
                      )}
                      <div className="border-t border-slate-300 mt-4 pt-3 flex justify-between text-[14px] font-bold text-black">
                        <div className="flex justify-between w-[48%]"><span>Total Charges:</span><span>{selectedTermData.totalCharges}</span></div>
                        <div className="flex justify-between w-[48%]"><span>Total Payments:</span><span>{selectedTermData.totalPayments}</span></div>
                      </div>
                      {selectedTermData.showPayBillButtons && (
                        <div className="mt-8 mb-4 flex gap-4">
                          <button className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium text-[15px]" onClick={() => setActiveTab("Payment Adjustments")}>Pay My Bill</button>
                          <button className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium text-[15px]">Print My Bill (Mail Payments)</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-[300px] text-[14px] text-slate-700">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-[#cc0033] text-xl font-normal mb-3">Payment Options</h3>
                        <h4 className="font-bold text-black mb-2">Pay Online By Electronic Check</h4>
                        <p className="leading-relaxed mb-4 text-[13px]">You may pay by e-check, which is an electronic withdrawal from your checking or savings bank account. No additional fee is charged for the e-check.</p>
                        <h4 className="font-bold text-black mb-2">Pay Online By Credit Card</h4>
                        <p className="leading-relaxed mb-2 text-[13px]">MasterCard, Visa, American Express and Discover Card may be used to pay tuition and fees online.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Payment Adjustments" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-normal text-slate-800 mb-6">Payment Adjustments</h2>
                <div className="bg-white shadow border-t-[3px] border-[#cc0033]">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center"><h3 className="text-xl text-slate-800">Payment Reductions</h3><HelpCircle className="h-4 w-4" /></div>
                  <div className="p-6 text-[15px] text-slate-800 space-y-6">
                    <p>For your payment, you may be able to reduce the Total Balance by claiming certain adjustments listed below. Check only the boxes that apply to your account.</p>
                    <div className="space-y-4">
                      <label className="flex items-start gap-3"><input type="checkbox" className="w-5 h-5 mt-0.5 accent-[#cc0033]" /><span>I am receiving financial aid that was not reflected on my term bill.</span></label>
                      <label className="flex items-start gap-3"><input type="checkbox" className="w-5 h-5 mt-0.5 accent-[#cc0033]" /><span>I have an external scholarship/third party payment but I am paying for part of my term bill.</span></label>
                      <label className="flex items-start gap-3"><input type="checkbox" className="w-5 h-5 mt-0.5 accent-[#cc0033]" /><span>I will be receiving remission for TA/GA/Fellow/Staff/Dependant Child.</span></label>
                    </div>
                    <h3 className="text-xl text-slate-800 pt-4">Adjust Principal Payment Amount</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-2xl py-2">
                      <div className="text-slate-700">Total Balance</div><div className="text-right font-medium">{selectedTermData.totalBalance.replace('$', '')}</div>
                      <div className="text-slate-700 mt-2">Principal Payment</div><div className="text-right"><div className="bg-gray-200 px-3 py-1.5 inline-block min-w-[200px] border border-gray-300 text-right">{selectedTermData.totalBalance.replace('$', '')}</div></div>
                    </div>
                    <div className="flex justify-end pt-4"><button className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium" onClick={() => setActiveTab("Verify Payment Adjustments")}>Verify Payment Adjustments</button></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Verify Payment Adjustments" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-normal text-slate-800 mb-6">Verify Payment Adjustments</h2>
                <div className="bg-white shadow border-t-[3px] border-[#cc0033]">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center"><h3 className="text-xl text-slate-800">Payment Options</h3><HelpCircle className="h-4 w-4" /></div>
                  <div className="p-6 text-[15px] text-slate-800 space-y-6">
                    <p className="text-lg">Pay by e-Check, credit card or International Transfer</p>
                    <div className="grid grid-cols-2 gap-4 py-4 pt-6 border-b border-gray-100 font-bold"><div>Principal Payment</div><div className="text-center">{selectedTermData.totalBalance.replace('$', '')}</div></div>
                    <div className="pt-4">
                      <button className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium mb-4" onClick={continueToOnlinePayment}>Continue to Online Payment</button>
                      <p className="text-xs text-gray-500">You will be redirected to a third party vendor, QuickPay, for payment processing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}