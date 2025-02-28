import React from 'react';
import { rulesList } from "../constants/Rules.js"; 

const Rules = () => {
  return (
    <>
    <div className="overflow-x-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-5 mt-10">Rules</h1>
      <table className="table mt-10 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-black">#</th>
            <th className="border p-2 text-black">Library Rules</th>
          </tr>
        </thead>
        <tbody>
          {rulesList.map((rule, index) => (
            <tr key={index} className="border">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Rules;
