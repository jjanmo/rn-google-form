import { CardType } from '@store/slice/cardSlice.type'

export const data: CardType[] = [
  {
    id: 'ae4a315e-c540-4abb-84af-46993e4e9859',
    type: 'title',
    title: 'MBTI 같은 설문지',
    description: '아무거나 물어봅니다 🫠',
  },
  {
    id: '878ee5b2-7abf-4183-9653-b45f4f19c561',
    type: 'radio',
    question: '주기적으로 새로운 친구를 만든다.',
    options: [
      {
        id: '76cae05a-7457-4ef6-ba50-2ddd2ed26ae5',
        text: '그렇다',
      },
      {
        id: '0e324bc1-fb38-4799-8e59-4432c21f9b21',
        text: '보통이다',
      },
      {
        id: '707bc590-1451-4bb2-86f2-9d8b066486ec',
        text: '아니다',
      },
    ],
    required: true,
  },
  {
    id: 'a019dee0-1759-4d07-94ac-1b6c3f97df85',
    type: 'checkbox',
    question: '6.25 당시 우리나라를 도와준 나라는?',
    options: [
      {
        id: '0f6e807a-1da4-45df-aa82-36725f246ded',
        text: '일본',
      },
      {
        id: '28a332e4-d505-4d31-a5e5-58d620b7e371',
        text: '영구',
      },
      {
        id: '0cd158eb-19a1-423a-8777-0c20e1b68b82',
        text: '미국',
      },
      {
        id: '4960f729-0727-45a6-b618-3f4eb1ac53a2',
        text: '프랑스',
      },
    ],
    required: false,
  },
  {
    id: 'fe08aa71-db54-485f-9ec5-4470686ad922',
    type: 'short',
    question: '1 + 2 = ?',
    options: [],
    required: true,
  },
  {
    id: '3238765b-894d-4829-b12a-c77962ad3d52',
    type: 'long',
    question: '오늘 중요한 일이 무엇이 있을까요',
    options: [],
    required: false,
  },
]
