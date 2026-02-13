import { GiftCardIcon, MailSend02Icon, CheckmarkBadge02Icon, LaurelWreath01Icon } from '@hugeicons/core-free-icons';
import { DialogStack, type StackItem } from '.';

export default function DialogStackDemo() {
  const DATA: StackItem[] = [
    {
      id: 'invite',
      title: 'Invite Friends',
      type: 'form',
      buttonText: 'Send Invite'
    },
    {
      id: 'how-it-works',
      title: 'How it works ?',
      type: 'steps',
      steps: [
        { icon: MailSend02Icon, text: "Send an invite to your friend who will be as excited as you to access the early access." }, 
        { icon: CheckmarkBadge02Icon, text: "Once they accept the invite, they will also get the early access like you." }, 
        { icon: LaurelWreath01Icon, text: "If your invited friend upgrade to pro, you both unlock the premium trail." } 
      ]
    }
  ];

  return (
      <DialogStack 
        stack={DATA} 
        trigger={{ label: "Invite Friends", icon: GiftCardIcon }} 
      />
  );
}