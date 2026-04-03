"use client";

import { useState } from 'react';
import { CreateCommunity } from './base';
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
    <div className="min-h-[80vh] h-[80vh] bg-transparent w-full flex items-center justify-center theme-injected font-sans">
      {!isModalOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-4xl text-base font-bold hover:bg-secondary/90 transition-colors shadow-lg"
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