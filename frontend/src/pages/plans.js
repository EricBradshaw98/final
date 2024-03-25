import React, { useCallback } from "react";
import "../styles/plans.scss";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cookies = new Cookies();

export const plans = [
  {
    id: "Monthly",
    planName: 'Monthly Plan',
    price: 19.99,
    billingCycle: 'month',
    description: 'This is a great plan for getting started.'
  },
  {
    id: "Yearly",
    planName: 'Yearly Plan',
    price: 199.99,
    billingCycle: 'year',
    description: 'This is a great plan for saving money.'
  }
];

const Plans = () => {
  const user_id = cookies.get("user_id");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate(); // Get the navigate function
  
  const handlePlanSelection = useCallback((plan) => {
    setSelectedPlan(plan); // Set the selected plan
    navigate('/checkout', { state: { selectedPlan: plan } }); // Navigate to Checkout with selected plan
  }, [navigate]);
 // Ensure navigate is included in the dependency array

  return (
    <div className="body-wrapper subscription-plans-container">
      <h2>Subscription Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <button className="plan-button" onClick={() => handlePlanSelection(plan)}>
              <h3>{plan.planName}</h3>
              <p>${plan.price.toFixed(2)} / {plan.billingCycle}</p>
              <p>{plan.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Plans;