// 静态表单只校验和展示结果；没有 fetch、网络提交或本地存储。
const form = document.querySelector('#signup');
if (form) {
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const year = Number(form.elements.year.value);
    const month = Number(form.elements.month.value);
    const day = Number(form.elements.day.value);
    const date = new Date(year, month - 1, day);
    if (year < 1900 || date > new Date() || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      status.textContent = '请填写有效的出生日期（不能晚于今天）。';
      form.elements.day.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim())) {
      status.textContent = '请填写格式有效的邮箱。';
      form.elements.email.focus();
      return;
    }
    if (!form.elements['full-name'].value.trim() || !form.elements.intro.value.trim()) {
      status.textContent = '姓名和自我介绍不能只包含空格。';
      return;
    }
    if (!form.querySelector('input[name="interest"]:checked')) {
      status.textContent = '请至少选择一个兴趣方向。';
      return;
    }
    status.textContent = '演示表单，信息未发送。格式校验通过；没有保存或登记你的信息。';
  });
  form.addEventListener('reset', () => { status.textContent = '已重置。演示表单，信息未发送。'; });
}
// 音频素材导入并启用 audio 后，点击按钮控制播放和暂停。
const music = document.querySelector('#bg-music');
const toggle = document.querySelector('#music-toggle');
const musicStatus = document.querySelector('#music-status');
if (music && toggle) {
  toggle.disabled = false;
  toggle.textContent = '♫ 播放背景音乐';
  toggle.addEventListener('click', async () => {
    if (!music.paused) { music.pause(); return; }
    try { await music.play(); } catch { musicStatus.textContent = '播放失败，请检查本地 MP3 文件或使用音频控件。'; }
  });
  music.addEventListener('play', () => { toggle.textContent = 'Ⅱ 暂停背景音乐'; toggle.setAttribute('aria-pressed', 'true'); musicStatus.textContent = '正在播放'; });
  music.addEventListener('pause', () => { toggle.textContent = '♫ 播放背景音乐'; toggle.setAttribute('aria-pressed', 'false'); musicStatus.textContent = '已暂停'; });
  music.addEventListener('error', () => { musicStatus.textContent = '音频加载失败，请检查素材文件。'; });
}
