const faqData = [
    { question: "Do I need experience to volunteer?", answer: "No experience is required. Just a passion for helping!" },
    { question: "What types of volunteer roles are available?", answer: "You can help with events, teaching, fundraising, and community outreach." },
    { question: "How often do volunteers meet?", answer: "It depends on the role. Some meet weekly, others as needed." },
  ];
  
  const VolunteerFAQ = () => {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Find answers to common questions about volunteering.</p>
  
          <div className="mt-8 text-left">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b py-4">
                <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default VolunteerFAQ;