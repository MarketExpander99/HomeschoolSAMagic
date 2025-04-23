const themes = {
  light: { bg: 'light-theme', text: 'text-gray-800', button: 'light-theme-button' },
  dark: { bg: 'dark-theme', text: 'text-gray-200', button: 'dark-theme-button' }
};

function generateUserIcon(username, coins, lessonsCompleted, activitiesCompleted, showcased, node, isAnimated, aiTechCompleted) {
  const today = new Date().toISOString().split('T')[0];
  const baseHash = username.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const dailyHash = (username + today).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const pattern = baseHash % 3;
  let hueShift = (dailyHash % 10) / 100;
  let sparkAngle = (dailyHash % 360);
  let svg = `<svg width="30" height="30" viewBox="0 0 100 100" class="${isAnimated ? 'pulse' : 'static'}">`;

  const lilac = `hsl(270, 50%, ${90 - hueShift * 10}%)`;
  if (pattern === 0) {
    svg += `<path class="spiral" stroke="${lilac}" d="M50 10 A10 10 0 0 1 60 20 A20 20 0 0 1 40 40 A30 30 0 0 1 70 70" />`;
  } else if (pattern === 1) {
    svg += `<path class="spiral" stroke="${lilac}" d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20" />`;
  } else {
    svg += `<path class="spiral" stroke="${lilac}" d="M10 50 Q30 30 50 50 T90 50" />`;
  }

  if (coins >= 10 && node === 'STEM') {
    svg += '<path class="rocket" d="M50 20 L60 40 L50 50 L40 40 Z" />';
  } else if (coins >= 10) {
    svg += '<polygon class="gold-star" points="50,20 53,30 63,30 55,35 57,45 50,40 43,45 45,35 37,30 47,30" />';
  }
  if (coins >= 20) {
    svg += '<path class="propeller" d="M50 30 L60 40 L50 50 L40 40 Z" />';
  }
  if (coins >= 30 && activitiesCompleted.includes('challenge')) {
    svg += '<polygon class="trophy" points="40,60 60,60 55,70 45,70" />';
  }
  if (coins >= 50 && lessonsCompleted.includes('lifeSkills')) {
    svg += '<path class="balloon-shape" d="M50 60 C40 40 60 40 50 20 C45 40 55 40 50 60 L50 80" />';
  }
  if (coins >= 50 && aiTechCompleted) {
    svg += '<path class="code-spark" d="M45 65 L50 60 L55 65 L50 70 Z" />';
  }
  if (coins >= 60 && node === 'STEM') {
    svg += '<path class="robot-arm" d="M30 70 L35 65 L40 70" />';
  }
  if (activitiesCompleted.includes('sports')) {
    svg += '<circle class="soccer-ball" cx="30" cy="70" r="5" />';
  }
  if (showcased) {
    svg += '<circle class="sparkler" cx="70" cy="30" r="3" />';
  }
  const sparkX = 50 + 30 * Math.cos(sparkAngle * Math.PI / 180);
  const sparkY = 50 + 30 * Math.sin(sparkAngle * Math.PI / 180);
  svg += `<circle class="spark" cx="${sparkX}" cy="${sparkY}" r="2" />`;

  svg += '</svg>';
  return svg;
}