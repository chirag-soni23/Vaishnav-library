import React from 'react';
import { rulesList } from "../constants/Rules.js";

const Rules = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-5 mt-10">Rules</h1>
        {rulesList.map((rule, index) => (
          <div key={index} className="mb-2">
            <div tabIndex={0} className="collapse collapse-plus bg-base-100 border-base-300 border">
              <div className="collapse-title font-semibold">Rule #{index + 1}</div>
              <div className="collapse-content text-sm">
                {rule}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Rules;
