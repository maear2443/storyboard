
import { SceneData } from './types';

export const INITIAL_SCENES: SceneData[] = [
  // ------------------------------------------------------------------
  // 1–4. 오프닝(고립과 현실)
  // ------------------------------------------------------------------
  {
    id: 1,
    sectionId: 1,
    sectionTitle: "1. 오프닝 (고립과 현실)",
    description: "빗방울이 창문에 떨어지는 극클로즈업",
    prompt: "Abstract Cinematic Shot. Focus heavily on the texture of rain sliding down a cold glass window at night. Through the distorted water droplets, we see the blurred, colorful bokeh of a lonely city. The mood is melancholic and isolated. Deep blues and cyans. High contrast, sharp focus on the water.",
    isGenerating: false,
  },
  {
    id: 2,
    sectionId: 1,
    sectionTitle: "1. 오프닝 (고립과 현실)",
    description: "책상 위 헤드셋, 미약한 빛",
    prompt: "High Angle shot looking down at a dark, cluttered desk. A VR headset sits in the center like a dormant artifact, emitting a weak, rhythmic white LED pulse. The room is pitch black around it. The lighting emphasizes the headset as a lifeline in the darkness. Cyberpunk noir vibe, dust particles in the air.",
    isGenerating: false,
  },
  {
    id: 3,
    sectionId: 1,
    sectionTitle: "1. 오프닝 (고립과 현실)",
    description: "한국 소녀의 손이 헤드셋을 천천히 집어 듦",
    prompt: "Close-Up on a girl's hand emerging from the shadows. Her fingers are delicate, trembling slightly as they reach for the glowing VR headset. Rim lighting catches the edge of her hand, highlighting human vulnerability against the cold tech. Focus on the hesitation and anticipation in the gesture.",
    isGenerating: false,
  },
  {
    id: 4,
    sectionId: 1,
    sectionTitle: "1. 오프닝 (고립과 현실)",
    description: "현실 방은 차갑고 어두움",
    prompt: "Medium Shot. A lonely Korean girl sits hunched in a dark, blue-lit room, silhouetted against her computer screens. She holds the headset. Her posture conveys deep isolation and weariness with the real world. The room is cramped and cold. Emotional atmosphere, desaturated cool tones.",
    isGenerating: false,
  },

  // ------------------------------------------------------------------
  // 5–8. 접속(현실 → 가상 전환)
  // ------------------------------------------------------------------
  {
    id: 5,
    sectionId: 2,
    sectionTitle: "2. 접속 (현실 → 가상 전환)",
    description: "헤드셋을 착용하는 순간 얼굴을 감싸는 은은한 광원",
    prompt: "Close-Up Profile Shot. The girl wears the VR headset. A soft, magical cyan light erupts from the visor, washing over her lower face. We see her lips part slightly in a breath of wonder. The lighting transforms her gloom into hope. High contrast between the dark room and the illuminated face.",
    isGenerating: false,
  },
  {
    id: 6,
    sectionId: 2,
    sectionTitle: "2. 접속 (현실 → 가상 전환)",
    description: "화면이 점점 흐려지며 메타버스 공간으로 전환",
    prompt: "First-Person POV (Abstract). The dark bedroom dissolves into streaks of neon light and digital pixels. It looks like a hyperspace jump, but softer—transitioning from heavy reality to weightless digital space. A tunnel of light. Motion blur, dreamy, ethereal atmosphere.",
    isGenerating: false,
  },
  {
    id: 7,
    sectionId: 2,
    sectionTitle: "2. 접속 (현실 → 가상 전환)",
    description: "가상공간의 넓은 정원, 아직 미완성 형태",
    prompt: "Over-The-Shoulder Shot of the girl's avatar (back view). She stands looking out at a vast, surreal digital garden that is 'loading'. Floating islands, wireframe grids mixing with lush grass. The scale is massive. The lighting is a soft, artificial dawn. She looks small against the infinite possibility.",
    isGenerating: false,
  },
  {
    id: 8,
    sectionId: 2,
    sectionTitle: "2. 접속 (현실 → 가상 전환)",
    description: "먼 곳에서 외국 친구의 아바타가 천천히 걸어옴",
    prompt: "POV Shot through the girl's eyes. In the distance of the grassy field, a male avatar approaches slowly. He is backlit by the virtual sun, creating a hazy, dreamlike silhouette. The focus is soft, emphasizing the feeling of a memory or a dream coming true. Pastoral, peaceful colors.",
    isGenerating: false,
  },

  // ------------------------------------------------------------------
  // 9–12. 재회(연결의 감정)
  // ------------------------------------------------------------------
  {
    id: 9,
    sectionId: 3,
    sectionTitle: "3. 재회 (연결의 감정)",
    description: "소녀의 고개가 아주 조금 들리며 빛이 얼굴을 스침",
    prompt: "Extreme Close-Up on the Girl Avatar's face. Focus on her eyes. They are wide, reflecting the approaching friend and filled with emotional tears of relief. A warm ray of light hits her face, symbolizing the warmth of connection. High fidelity facial expression, anime-style emotional depth.",
    isGenerating: false,
  },
  {
    id: 10,
    sectionId: 3,
    sectionTitle: "3. 재회 (연결의 감정)",
    description: "두 아바타가 가까워지지만 손은 닿지 않음(거리 상징)",
    prompt: "Mid-Shot focused on their hands. The two avatars stand facing each other. Their hands are reached out but stop inches apart, separated by an invisible barrier of air. The composition emphasizes the 'almost' touch. The background is blurred. A poignant representation of digital distance.",
    isGenerating: false,
  },
  {
    id: 11,
    sectionId: 3,
    sectionTitle: "3. 재회 (연결의 감정)",
    description: "꽃잎들이 바람을 타고 두 사람 사이를 가로지름",
    prompt: "Cinematic Two-Shot. They look at each other with longing. A sudden wind blows a stream of glowing pink cherry blossom petals between them, bridging the gap. The petals are translucent and light-emitting. The lighting is romantic and soft. It feels like a scene from a high-budget anime drama.",
    isGenerating: false,
  },
  {
    id: 12,
    sectionId: 3,
    sectionTitle: "3. 재회 (연결의 감정)",
    description: "두 아바타가 함께 걸어 정원 한가운데로 이동",
    prompt: "Wide Tracking Shot. The two avatars walk side-by-side through the tall grass towards the horizon. They are small figures in a beautiful landscape, but their proximity shows companionship. The sky is a gradient of purple and orange. A sense of a shared journey beginning.",
    isGenerating: false,
  },

  // ------------------------------------------------------------------
  // 13–17. 창조(미래 만드는 장면)
  // ------------------------------------------------------------------
  {
    id: 13,
    sectionId: 4,
    sectionTitle: "4. 창조 (미래를 만드는 장면)",
    description: "아바타 손짓 → AI가 반응해 꽃나무가 피어남",
    prompt: "Close-Up of the Girl's hand conducting magic. She waves her fingers, and trails of sparkling gold dust create blooming flowers in the air. Her expression is one of focused joy and creativity. The magic lighting illuminates her face from below. Fantasy visual effects.",
    isGenerating: false,
  },
  {
    id: 14,
    sectionId: 4,
    sectionTitle: "4. 창조 (미래를 만드는 장면)",
    description: "외국 친구의 움직임은 천천히, 그러나 표정은 밝음",
    prompt: "Portrait Shot of the Friend's Avatar. He watches her magic. He moves slowly (hinting at physical weakness), but his face is beaming with a radiant, healthy smile. The lighting is warm and golden, making him look angelic and free from pain. Focus purely on his expression of happiness.",
    isGenerating: false,
  },
  {
    id: 15,
    sectionId: 4,
    sectionTitle: "4. 창조 (미래를 만드는 장면)",
    description: "소녀가 만든 빛의 구슬이 공중으로 떠올라 공간을 채움",
    prompt: "Low Angle Shot looking up. The girl and boy stand back-to-back, looking up as hundreds of glowing light orbs rise from the ground into the night sky. Their faces are illuminated by the rising lights. A sense of wonder and shared magic. Disney-style magical atmosphere.",
    isGenerating: false,
  },
  {
    id: 16,
    sectionId: 4,
    sectionTitle: "4. 창조 (미래를 만드는 장면)",
    description: "두 아바타가 손을 올리자 구슬들이 하나의 구조물로 조립됨",
    prompt: "Medium Shot. Both avatars raise their hands in unison towards the sky. Above them, the light orbs snap together to form the glowing skeleton of a giant tree. Their body language is synchronized, showing unity. The light from the structure casts long dramatic shadows behind them.",
    isGenerating: false,
  },
  {
    id: 17,
    sectionId: 4,
    sectionTitle: "4. 창조 (미래를 만드는 장면)",
    description: "‘정원 중심부’ 완성 – 빛나는 나무 한 그루",
    prompt: "Wide Epic Shot. A colossal, crystalline tree stands fully formed in the center of the garden, pulsing with internal light. It is beautiful and otherworldly. The two small avatars stand at its base, looking up at their creation. Starry night sky background. A symbol of their bond.",
    isGenerating: false,
  },

  // ------------------------------------------------------------------
  // 18–21. 약속(감동 포인트)
  // ------------------------------------------------------------------
  {
    id: 18,
    sectionId: 5,
    sectionTitle: "5. 약속 (감동 포인트)",
    description: "외국 친구의 아바타 실루엣 뒤로 병실 모니터 그래픽이 희미하게 투영",
    prompt: "Close-Up Character Study. The Friend's avatar looks at the tree. Superimposed faintly over his chest and shoulder is a holographic projection of a hospital heart monitor line and IV tubes. He looks peaceful, but the graphic reveals his struggle. Sad, beautiful, and narrative-heavy. Backlit silhouette.",
    isGenerating: false,
  },
  {
    id: 19,
    sectionId: 5,
    sectionTitle: "5. 약속 (감동 포인트)",
    description: "소녀가 나무 아래를 가리킴",
    prompt: "Medium Shot. The Girl avatar turns to him, her face serious and determined. She points emphatically at the ground beneath the tree. She is making a vow. 'We will meet here.' Focus on her fierce determination to overcome reality. Emotional storytelling.",
    isGenerating: false,
  },
  {
    id: 20,
    sectionId: 5,
    sectionTitle: "5. 약속 (감동 포인트)",
    description: "두 아바타가 손끝을 맞대는 순간, 빛이 확장",
    prompt: "Macro Close-Up. Their index fingers finally touch. At the contact point, a blinding white starburst of light explodes, erasing the gap between them. It represents the 'Promise'. High exposure, lens flare, magical and intense energy.",
    isGenerating: false,
  },
  {
    id: 21,
    sectionId: 5,
    sectionTitle: "5. 약속 (감동 포인트)",
    description: "정원 전체가 완성된 형태로 펼쳐짐",
    prompt: "Wide Reaction Shot. The camera pulls back rapidly. The shockwave of light turns the wireframe garden into a lush, hyper-realistic paradise. We see the backs of the two characters as the world blooms around them. Vibrant greens, waterfalls, birds. A celebration of life.",
    isGenerating: false,
  },

  // ------------------------------------------------------------------
  // 22–24. 엔딩(희망)
  // ------------------------------------------------------------------
  {
    id: 22,
    sectionId: 6,
    sectionTitle: "6. 엔딩 (희망)",
    description: "두 아바타가 나무 아래서 서로를 바라봄",
    prompt: "Intimate Two-Shot. They sit under the giant glowing tree. They are looking directly at each other, not the scenery. Both are smiling gently. The lighting is the 'Golden Hour' warm glow. It feels intimate, quiet, and full of unspoken understanding. Character-driven emotion.",
    isGenerating: false,
  },
  {
    id: 23,
    sectionId: 6,
    sectionTitle: "6. 엔딩 (희망)",
    description: "카메라가 천천히 상승 → 정원 전체 조망",
    prompt: "Extreme High Angle (Bird's Eye). The camera rises high into the sky. The two figures are tiny dots of light under the protective canopy of their tree. The world extends infinitely. A feeling of peace and a future waiting to happen. Atmospheric clouds.",
    isGenerating: false,
  },
  {
    id: 24,
    sectionId: 6,
    sectionTitle: "6. 엔딩 (희망)",
    description: "화면 페이드아웃 + “Tomorrow, Built Together.”",
    prompt: "Graphic Design Layout. A simple, elegant title card. A gradient of dawn colors (purple to orange). In the center, thin white cinematic text reads: 'Tomorrow, Built Together.' Subtle particles float in the background. Clean, hopeful conclusion.",
    isGenerating: false,
  },
];
