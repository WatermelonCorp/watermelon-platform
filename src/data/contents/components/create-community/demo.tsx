"use client";

import { useState } from 'react';
import { CreateCommunity } from './index';
import { motion } from 'motion/react';

const CreateCommunityDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myData = {
    communityName: "Web3 Masters",
    pricing: "MONTHLY",
    isApplicationRequired: true
  };

  const handleCreate = (data: any) => {
    console.log("Community Data Created:", data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[80vh] h-[80vh]  bg-transparent w-full  flex items-center justify-center ">
      {!isModalOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#EDEDED] text-black px-6 py-3.5 rounded-full text-[16px] font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Open Community Creator
        </motion.button>
      )}

      <CreateCommunity
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        initialData={myData}
      />
    </div>
  );
};

export default CreateCommunityDemo;