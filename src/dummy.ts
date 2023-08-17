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
    question: '개발자로서 당신은??',
    options: [
      {
        id: '0f6e807a-1da4-45df-aa82-36725f246ded',
        text: '재치 있게 말을 잘하고 유머러스한 편이에요.',
      },
      {
        id: '28a332e4-d505-4d31-a5e5-58d620b7e371',
        text: '다른 이를 행복하게 해주고 싶은 욕구가 있어요.',
      },
      {
        id: '0cd158eb-19a1-423a-8777-0c20e1b68b82',
        text: '타인과 조화롭게 살고 싶은 욕구가 있어요.',
      },
      {
        id: '947d335e-eec0-4a1a-a762-d04cc4859bfd',
        text: '자신만의 강한 신념을 가지고 있어요.',
      },
      {
        id: 'a1e37b1c-022b-4a74-a563-4ef3e881e6a9',
        text: '모든 사람을 편견없이 수용할 수 있어요.',
      },
      {
        id: 'dd7660c8-d84e-41c9-8e98-7c87ddcd2024',
        text: '너그럽고 온화한 편이에요.',
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
    question: '오늘은 어떠한 버그를 수정했나요',
    options: [],
    required: false,
  },
]
