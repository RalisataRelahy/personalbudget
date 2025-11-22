import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCQ3bqUt8UT9KJJhkJembIfiItIaovzwQY'); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function sendMessage(message) {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I couldn't process your request.";
  }
}
// import { GoogleGenerativeAI } from '@google/generative-ai';

// class GeminiService {
//   constructor() {
//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//     if (!apiKey) {
//       throw new Error('Gemini API key is missing');
//     }
    
//     this.genAI = new GoogleGenerativeAI(apiKey);
//     this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
//   }

//   async generateContent(prompt) {
//     try {
//       const result = await this.model.generateContent(prompt);
//       const response = await result.response;
//       return response.text();
//     } catch (error) {
//       console.error('Error generating content:', error);
//       throw new Error('Failed to generate content');
//     }
//   }

//   // Specific method for expense analysis
//   async analyzeExpenses(expenses, userQuestion = '') {
//     const prompt = this.createExpenseAnalysisPrompt(expenses, userQuestion);
//     return await this.generateContent(prompt);
//   }

//   createExpenseAnalysisPrompt(expenses, userQuestion) {
//     const expenseSummary = expenses.map(exp => 
//       `${exp.name}: ${exp.amount} Ar (${exp.category}) - ${exp.date || 'No date'}`
//     ).join('\n');

//     const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    
//     const basePrompt = `
//       Analyze these expenses and provide insights in French:
      
//       Total Expenses: ${total.toFixed(2)} Ar
//       Number of Expenses: ${expenses.length}
      
//       Expenses List:
//       ${expenseSummary}
      
//       Please provide:
//       1. Spending patterns and trends
//       2. Category-wise analysis
//       3. Money-saving suggestions
//       4. Budget optimization tips
      
//       Keep the response concise and practical.
//     `;

//     return userQuestion ? `${basePrompt}\n\nUser Question: ${userQuestion}` : basePrompt;
//   }

//   // Method for expense categorization suggestions
//   async suggestCategory(expenseName, amount) {
//     const prompt = `
//       Suggest the most appropriate category for this expense in one word (in English):
//       Expense: ${expenseName}
//       Amount: ${amount} Ar
      
//       Choose from: Food, Transport, Shopping, Entertainment, Bills, Health, Education, Other
//       Respond with only the category name.
//     `;
    
//     try {
//       const category = await this.generateContent(prompt);
//       return category.trim();
//     } catch (error) {
//       return 'Other';
//     }
//   }

//   // Method for financial advice
//   async getFinancialAdvice(expenses, monthlyIncome = null) {
//     const prompt = `
//       As a financial advisor, analyze these expenses and provide advice in French:
      
//       ${expenses.map(exp => `${exp.name}: ${exp.amount} Ar (${exp.category})`).join('\n')}
      
//       ${monthlyIncome ? `Monthly Income: ${monthlyIncome} Ar` : ''}
      
//       Provide:
//       1. Spending analysis
//       2. Budget recommendations
//       3. Saving opportunities
//       4. Financial health assessment
      
//       Keep it practical and actionable.
//     `;
    
//     return await this.generateContent(prompt);
//   }
// }

// export default new GeminiService();