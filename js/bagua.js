/**
 * 八卦占卜系统
 * 基于易经和五行理论的占卜数据库和工具方法
 */

// 8 卦基础数据库
const BAGUA_DATA = [
  {
    id: 0,
    name: "乾",
    symbol: "☰",
    trigram: "三阳爻",
    position: "northwest",
    wuxing: "金",
    element_name: "天",
    traditional_meaning: "天、刚健、创始、强劲、驱动",
    yaoci: "乾卦：吉，利贞。象曰：天行健，君子以自强不息。",
    upright: "积极主动、自强不息、坚韧不拔、领导力强、财运亨通",
    reversed: "压制、刚愎自用、固执己见、骄傲自大、能量消耗",
    love: "感情：主动追求，但要避免过于强势；感情运势稳定",
    career: "事业：适合领导，具有进取心，能开创新局面，但需注意人际关系",
    wealth: "财运：有进财机会，靠自身努力获得，但需合理规划投资",
    life: "人生：提示你要主动出击，抓住机遇，但也要学会谦虚包容"
  },
  {
    id: 1,
    name: "坤",
    symbol: "☷",
    trigram: "三阴爻",
    position: "southwest",
    wuxing: "土",
    element_name: "地",
    traditional_meaning: "地、柔顺、承载、包容、孕育",
    yaoci: "坤卦：吉，利牝马之贞。象曰：地势坤，君子以厚德载物。",
    upright: "温柔体贴、包容大度、稳健可靠、脚踏实地、守护他人",
    reversed: "被动消极、过度忍让、运气平庸、缺乏动力、承载过重",
    love: "感情：温柔体贴，易获好感，但需防被动局面；宜以柔克刚",
    career: "事业：适合幕后工作，执行力强，但需寻求突破；团队合作佳",
    wealth: "财运：稳定获利，但增长缓慢；宜长期投资，忌急功近利",
    life: "人生：提示你要包容坚韧，但也要适时发声；平衡是关键"
  },
  {
    id: 2,
    name: "震",
    symbol: "☳",
    trigram: "阳在下",
    position: "east",
    wuxing: "木",
    element_name: "雷",
    traditional_meaning: "雷、振动、启蒙、惊醒、新生",
    yaoci: "震卦：吉，震来虩虩，笑言哑哑。象曰：洊雷震，君子以恐惧修身。",
    upright: "警醒觉悟、行动迅捷、生机蓬勃、新的开始、创新突破",
    reversed: "惶恐不安、行动混乱、停滞不前、惊吓受挫、失去方向",
    love: "感情：感情有新的发展，充满朝气，但易波澜；需主动沟通",
    career: "事业：有新机遇来临，适合创新创业，需要把握时机；快速行动",
    wealth: "财运：有突发机遇，财运波动大；需要警惕风险，谨慎决策",
    life: "人生：提示你新的阶段开启了，要敢于行动；但也要谨慎风险"
  },
  {
    id: 3,
    name: "巽",
    symbol: "☴",
    trigram: "阴在下",
    position: "southeast",
    wuxing: "木",
    element_name: "风",
    traditional_meaning: "风、柔和、渗透、顺应、传播",
    yaoci: "巽卦：小亨，利有攸往，利见大人。象曰：随风巽，君子以申命行事。",
    upright: "温和顺应、灵活变通、善于沟通、表达清晰、传播广泛",
    reversed: "优柔寡断、过度退让、沟通不畅、执行力差、被动应对",
    love: "感情：温柔乖巧易获青睐，但需表达真实想法；沟通很重要",
    career: "事业：适合文案、策划、营销等工作；沟通协调能力强；灵活变通",
    wealth: "财运：进财方式多样，但每笔都不大；适合多元投资分散风险",
    life: "人生：提示你顺势而为，但不可过度退让；要有自己的主见"
  },
  {
    id: 4,
    name: "坎",
    symbol: "☵",
    trigram: "阳在中",
    position: "north",
    wuxing: "水",
    element_name: "水",
    traditional_meaning: "水、流动、险阻、智慧、下行",
    yaoci: "坎卦：习坎，有孚，维心亨，行有尚。象曰：水流而下，重险必谨。",
    upright: "智慧深沉、心境坦然、流动灵活、历经磨炼、洞察力强",
    reversed: "陷入困境、心事重重、被困束缚、信心不足、道路险阻",
    love: "感情：感情深沉，但可能面临波折；需要耐心等待，考验真心",
    career: "事业：工作有挑战，但能锻炼人；需坚定信心度过难关；厚积薄发",
    wealth: "财运：处于困难期，但能积累经验；不宜冒险，稳健理财为上策",
    life: "人生：提示你正面临考验，但要保持清醒；危机中往往有转机"
  },
  {
    id: 5,
    name: "离",
    symbol: "☲",
    trigram: "阴在中",
    position: "south",
    wuxing: "火",
    element_name: "火",
    traditional_meaning: "火、光明、向上、热烈、粘着",
    yaoci: "离卦：离，吉，亨，大畜。象曰：明两作离，大人以继明照于四方。",
    upright: "光明璀璨、热情洋溢、聪慧敏锐、前景光明、名气提升",
    reversed: "黯淡沉寂、过度消耗、虚幻虚妄、失去光芒、前景迷茫",
    love: "感情：光彩照人，桃花旺盛，感情热烈；需防感情过烈而失控",
    career: "事业：正当时，名气上升，机遇增加；适合抛头露面的工作",
    wealth: "财运：财运旺盛，进财渠道增多；但需警惕过度消费和虚假承诺",
    life: "人生：提示你正处于上升期，要充分展现自己；但也要脚踏实地"
  },
  {
    id: 6,
    name: "艮",
    symbol: "☶",
    trigram: "阳在上",
    position: "northeast",
    wuxing: "土",
    element_name: "山",
    traditional_meaning: "山、停止、沉静、思考、坚持",
    yaoci: "艮卦：艮，其背，不获其身，行其庭，不见其人，无咎。象曰：兼山艮，君子以思不出其位。",
    upright: "沉着冷静、深思熟虑、坚定不移、静观其变、内在修为",
    reversed: "固执己见、停滞不前、缺乏行动、被动等待、思想禁锢",
    love: "感情：感情进展缓慢，需要冷静思考；但感情一旦确定就坚定不移",
    career: "事业：处于蓄势阶段，需耐心等待；但也要适时突破，不可过度保守",
    wealth: "财运：财运停滞，需要调整策略；不宜急进，等待合适时机再动",
    life: "人生：提示你要静观其变，做好准备；时机到时就能突破现状"
  },
  {
    id: 7,
    name: "兑",
    symbol: "☱",
    trigram: "阴在上",
    position: "west",
    wuxing: "金",
    element_name: "泽",
    traditional_meaning: "泽、喜悦、沼泽、交流、柔和",
    yaoci: "兑卦：兑，亨，利贞。象曰：丽泽兑，君子以朋友讲习。",
    upright: "欢乐喜悦、人气旺盛、交流顺畅、收获成果、气氛和谐",
    reversed: "过度狂欢、无谓浪费、散漫失焦、虚假承诺、后续无力",
    love: "感情：感情气氛和谐，交流顺畅，容易成就好事；充满欢乐",
    career: "事业：团队气氛好，合作顺利，容易成果；适合与人打交道的工作",
    wealth: "财运：有收获的喜悦，进财顺利；但需警惕过度消费和错误承诺",
    life: "人生：提示你要享受成果，但不可过度；平衡享乐与责任的关系"
  }
];

// 五行对应关系
const WUXING_INFO = {
  "木": { color: "#2ecc71", direction: "东", season: "春", emotion: "喜悦", body: "肝胆" },
  "火": { color: "#e74c3c", direction: "南", season: "夏", emotion: "热情", body: "心小肠" },
  "土": { color: "#f39c12", direction: "中央", season: "长夏", emotion: "信任", body: "脾胃" },
  "金": { color: "#bdc3c7", direction: "西", season: "秋", emotion: "悲喜", body: "肺大肠" },
  "水": { color: "#3498db", direction: "北", season: "冬", emotion: "恐惧", body: "肾膀胱" }
};

// 五行生克关系
const WUXING_RELATIONS = {
  "木火": "相生",    // 木生火
  "火土": "相生",    // 火生土
  "土金": "相生",    // 土生金
  "金水": "相生",    // 金生水
  "水木": "相生",    // 水生木
  "火金": "相克",    // 火克金
  "土水": "相克",    // 土克水
  "木土": "相克",    // 木克土
  "金木": "相克",    // 金克木
  "水火": "相克"     // 水克火
};

/**
 * 获取两个五行之间的关系
 */
function getWuxingRelation(wuxing1, wuxing2) {
  if (wuxing1 === wuxing2) return "相同";
  
  const key1 = wuxing1 + wuxing2;
  const key2 = wuxing2 + wuxing1;
  
  // 反向查找生克关系
  if (WUXING_RELATIONS[key1]) return WUXING_RELATIONS[key1];
  
  // 如果是生克的反向，则为被生/被克
  if (key1 === "火木") return "相生"; // 木生火的反向
  if (key1 === "土火") return "相生"; // 火生土的反向
  if (key1 === "金土") return "相生"; // 土生金的反向
  if (key1 === "水金") return "相生"; // 金生水的反向
  if (key1 === "木水") return "相生"; // 水生木的反向
  if (key1 === "金火") return "相克"; // 火克金的反向
  if (key1 === "水土") return "相克"; // 土克水的反向
  if (key1 === "土木") return "相克"; // 木克土的反向
  if (key1 === "木金") return "相克"; // 金克木的反向
  if (key1 === "火水") return "相克"; // 水克火的反向
  
  return "未知";
}

/**
 * 随机从 8 卦中抽取指定数量的卦象（不重复）
 * @param {number} count 抽取数量，默认 5 张
 * @returns {Array} 抽取的卦象数组
 */
function drawCards(count = 5) {
  const shuffled = [...BAGUA_DATA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, BAGUA_DATA.length));
}

/**
 * 根据 id 获取卦象信息
 */
function getBaguaById(id) {
  return BAGUA_DATA.find(b => b.id === id);
}

/**
 * 获取所有卦象
 */
function getAllBagua() {
  return BAGUA_DATA;
}

/**
 * 生成占卜解读文本
 * @param {Array} cards 5 个抽取的卦象
 * @param {string} question 用户提出的问题
 * @returns {string} 占卜解读文本
 */
function generateDivination(cards, question) {
  if (!cards || cards.length === 0) return "未获得卦象信息";
  
  let divination = "";
  
  // 第一部分：五卦信息概览
  divination += "【抽取的五卦】\n";
  cards.forEach((card, index) => {
    divination += `${index + 1}. ${card.name}卦（${card.element_name}） - ${card.symbol}\n`;
  });
  
  divination += "\n【五卦吉凶分析】\n";
  const meanings = cards.map(c => c.upright).join("、");
  divination += meanings + "\n";
  
  // 第二部分：五行生克分析
  divination += "\n【五行生克分析】\n";
  const wuxings = cards.map(c => c.wuxing);
  
  // 统计五行数量
  const wuxingCount = {};
  wuxings.forEach(w => {
    wuxingCount[w] = (wuxingCount[w] || 0) + 1;
  });
  
  const wuxingList = Object.entries(wuxingCount)
    .map(([w, count]) => `${w}（${count}个卦）`)
    .join("、");
  divination += `五行分布：${wuxingList}\n`;
  
  // 五行相克分析
  divination += "五行互动：";
  let relationAnalysis = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const relation = getWuxingRelation(cards[i].wuxing, cards[j].wuxing);
      if (relation !== "相同") {
        relationAnalysis.push(`${cards[i].name}(${cards[i].wuxing})${relation}${cards[j].name}(${cards[j].wuxing})`);
      }
    }
  }
  if (relationAnalysis.length > 0) {
    divination += relationAnalysis.join("；") + "\n";
  } else {
    divination += "五行均衡，互相制约与促进达到平衡\n";
  }
  
  // 第三部分：针对问题的占卜解读
  divination += `\n【针对"${question}"的占卜解读】\n`;
  
  // 根据问题类型提供不同的建议
  if (question.includes("事业") || question.includes("工作") || question.includes("职业")) {
    divination += generateCareerDivination(cards, question);
  } else if (question.includes("感情") || question.includes("爱情") || question.includes("婚姻")) {
    divination += generateLoveDivination(cards, question);
  } else if (question.includes("财") || question.includes("钱") || question.includes("投资")) {
    divination += generateWealthDivination(cards, question);
  } else {
    divination += generateGeneralDivination(cards, question);
  }
  
  // 第四部分：总体建议
  divination += "\n【总体建议】\n";
  divination += generateAdvice(cards, question);
  
  return divination;
}

/**
 * 生成事业相关的占卜解读
 */
function generateCareerDivination(cards, question) {
  let text = "";
  const hasQian = cards.some(c => c.name === "乾");
  const hasKun = cards.some(c => c.name === "坤");
  const hasZhen = cards.some(c => c.name === "震");
  const hasLi = cards.some(c => c.name === "离");
  const hasGen = cards.some(c => c.name === "艮");
  
  if (hasQian) {
    text += "乾卦现身，示你事业应该主动出击，抓住领导机遇。适合担当重任，但需要避免过于强势而失去人心。\n";
  }
  if (hasZhen) {
    text += "震卦示现，事业有新的突破和机遇，适合创新创业或者进行重大调整。但需要警惕突然的变化可能带来的风险。\n";
  }
  if (hasLi) {
    text += "离卦呈现，你的事业正处于上升期，人气旺盛，名气提升。这是展现自己的好机会，但要脚踏实地。\n";
  }
  if (hasKun || hasGen) {
    text += "坤/艮卦提醒，事业需要稳步推进，不可急功近利。当前阶段适合积累经验和人脉，为未来的大突破做准备。\n";
  }
  
  if (!text) {
    text = "根据抽取的卦象，你的事业运势呈现循环发展的特点。建议在稳健基础上寻求创新，在积极进取中保持谦虚。\n";
  }
  
  return text;
}

/**
 * 生成感情相关的占卜解读
 */
function generateLoveDivination(cards, question) {
  let text = "";
  const hasDui = cards.some(c => c.name === "兑");
  const hasZhen = cards.some(c => c.name === "震");
  const hasKan = cards.some(c => c.name === "坎");
  const hasLi = cards.some(c => c.name === "离");
  
  if (hasDui) {
    text += "兑卦示现，感情气氛和谐，沟通顺畅，容易化解分歧。这是感情深进的好时机，充满欢乐和喜悦。\n";
  }
  if (hasZhen) {
    text += "震卦现身，感情有新发展，充满朝气，但可能也会面临波澜。建议保持主动沟通，抓住机遇表达真心。\n";
  }
  if (hasKan) {
    text += "坎卦呈现，感情运势面临考验，但能锻炼双方的感情。需要耐心等待，相信真心能穿过重重考验。\n";
  }
  if (hasLi) {
    text += "离卦提示，感情运势火热，桃花旺盛。但要警惕过度热情而失控，需要理性思考和长期考量。\n";
  }
  
  if (!text) {
    text = "根据卦象显示，你的感情运势呈现动态平衡的状态。既有稳定发展的基础，也有突破的机遇。关键是保持真诚和耐心。\n";
  }
  
  return text;
}

/**
 * 生成财运相关的占卜解读
 */
function generateWealthDivination(cards, question) {
  let text = "";
  const hasQian = cards.some(c => c.name === "乾");
  const hasLi = cards.some(c => c.name === "离");
  const hasDui = cards.some(c => c.name === "兑");
  const hasKan = cards.some(c => c.name === "坎");
  const hasGen = cards.some(c => c.name === "艮");
  
  if (hasQian) {
    text += "乾卦出现，财运亨通，有进财机会。依靠自身努力和主动出击能获得收益，但需要合理规划投资。\n";
  }
  if (hasLi) {
    text += "离卦示现，财运旺盛，进财渠道增多。但需要警惕过度消费和虚假承诺，合理规划才能长久。\n";
  }
  if (hasDui) {
    text += "兑卦呈现，有收获的喜悦，进财顺利。但要警惕过度消费和错误承诺，平衡享乐和储蓄很重要。\n";
  }
  if (hasKan) {
    text += "坎卦提醒，财运处于困难期，但能积累经验。不宜冒险，稳健理财和长期投资是上策。\n";
  }
  if (hasGen) {
    text += "艮卦提示，财运暂时停滞，需调整策略。等待合适时机再动作，不可急进，耐心准备才能成功。\n";
  }
  
  if (!text) {
    text = "根据卦象显示，你的财运呈现稳健发展的特点。既有稳定的收入来源，也有增长的空间。建议多元投资，分散风险。\n";
  }
  
  return text;
}

/**
 * 生成通用占卜解读
 */
function generateGeneralDivination(cards, question) {
  let text = "";
  const positiveCount = cards.filter(c => c.upright.length > 0).length;
  const negativeCount = cards.length - positiveCount;
  
  if (positiveCount >= 4) {
    text += "卦象总体吉利，你的运势处于上升期。要充分把握这个有利的时机，主动出击，相信自己的能力。\n";
  } else if (positiveCount >= 3) {
    text += "卦象整体偏吉，虽有小的波折，但总体趋势向好。建议在稳健的基础上适度进取，保持耐心。\n";
  } else if (positiveCount >= 1) {
    text += "卦象显示运势有挑战，但也有转机。这是考验和成长的时期，需要保持积极心态和明智决策。\n";
  } else {
    text += "卦象提示你当前面临重大考验，但正是修为和积累的好机会。坚持和耐心将成为最大的财富。\n";
  }
  
  // 根据五行平衡给出建议
  const wuxingCount = {};
  cards.forEach(c => {
    wuxingCount[c.wuxing] = (wuxingCount[c.wuxing] || 0) + 1;
  });
  
  const hasAll = Object.keys(wuxingCount).length === 5;
  if (hasAll) {
    text += "五行俱全，五行平衡，这预示着全面的发展和完整的能量流动。\n";
  } else {
    const missing = ["木", "火", "土", "金", "水"].filter(w => !wuxingCount[w]);
    if (missing.length > 0) {
      text += `缺少${missing.join("、")}，建议在这些方面多加关注和平衡。\n`;
    }
  }
  
  return text;
}

/**
 * 根据卦象生成总体建议
 */
function generateAdvice(cards, question) {
  let advice = "";
  
  const hasQian = cards.some(c => c.name === "乾");
  const hasKun = cards.some(c => c.name === "坤");
  const hasZhen = cards.some(c => c.name === "震");
  const hasXun = cards.some(c => c.name === "巽");
  const hasKan = cards.some(c => c.name === "坎");
  const hasLi = cards.some(c => c.name === "离");
  const hasGen = cards.some(c => c.name === "艮");
  const hasDui = cards.some(c => c.name === "兑");
  
  const suggestions = [];
  
  if (hasQian) suggestions.push("发挥主动性和领导力");
  if (hasKun) suggestions.push("学会包容和耐心");
  if (hasZhen) suggestions.push("抓住突变的机遇");
  if (hasXun) suggestions.push("灵活变通和沟通");
  if (hasKan) suggestions.push("保持清醒和智慧");
  if (hasLi) suggestions.push("展现自己的光彩");
  if (hasGen) suggestions.push("静观其变和准备");
  if (hasDui) suggestions.push("享受当下和分享");
  
  advice = suggestions.join("、") + "。\n";
  
  if (hasZhen && hasKan) {
    advice += "震和坎的组合提示你要在变动中保持清醒，在困难中寻求突破。\n";
  }
  
  if (hasQian && hasKun) {
    advice += "乾坤的组合象征天地和谐，预示着大的格局变化。准备好迎接新时代的到来。\n";
  }
  
  advice += "最后，记住易经的智慧：事在人为，但也要顺应天时地利人和。祝你前程似锦！";
  
  return advice;
}

// 导出所有函数和数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BAGUA_DATA,
    WUXING_INFO,
    WUXING_RELATIONS,
    drawCards,
    getBaguaById,
    getAllBagua,
    generateDivination,
    getWuxingRelation
  };
}
