const fs = require('fs');
fetch('https://r.jina.ai/https://arxiv.org/html/2507.00507v1').then(res => res.text()).then(text => fs.writeFileSync('paper.md', text));
