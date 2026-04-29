/**
 * MILDECOR / FAQ Schema (JSON-LD)
 * ─────────────────────────────────────────────────────────────
 * Generates JSON-LD structured data for FAQ pages, eligible for
 * Google's FAQ rich results.
 *
 * Looks for:
 *   - .faq-schema container
 *   - .faq-question elements (questions)
 *   - .faq-answer elements (matching answers, in order)
 *
 * If found, injects a <script type="application/ld+json"> into <head>
 * with FAQPage schema.
 *
 * @author Julien Laumonerie / Nerie Studio
 * @since v1.0.0
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var faqBlock = document.querySelector('.faq-schema');
    if (!faqBlock) return;

    var questions = faqBlock.querySelectorAll('.faq-question');
    var answers = faqBlock.querySelectorAll('.faq-answer');
    if (!questions.length || questions.length !== answers.length) return;

    var faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': []
    };

    questions.forEach(function (question, index) {
      faqData.mainEntity.push({
        '@type': 'Question',
        'name': question.innerText.trim(),
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answers[index].innerText.trim()
        }
      });
    });

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqData);
    document.head.appendChild(script);
  });

})();
