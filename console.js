(()=>{
const acskName = 'ДФС';
const type = '[ЗАПОВНИТИ!!!]';

const paramArray = [
  'Повне ім\'я',
  'РН Сертифікату:',
  'Початок строку дії:',
  'Завершення строку дії:',
];


const textData = (()=>{
    const number = document.querySelector('.content>table+table>tbody>tr+tr').textContent.match(/\d+/)[0];
    return (
      Array.from(document.querySelectorAll('.content>table>tbody>tr>td>table'))
      .filter(table=>table.textContent.toUpperCase().includes('ВИЩА РАДА ПРАВОСУДДЯ'))
      .map(table=>{
        let name = '';

        const text = 
        Array.from(table.querySelectorAll('b')).filter(el=>(
          paramArray.includes(el.textContent)
        ))
        .map(el=>({
          param: el.textContent,
          value: el.nextSibling?.textContent.replace(/^\:/,'').trim() || '[ЗАПОВНИТИ!!!]',
        }))
        .map(el=>{
          // if(paramArray.indexOf(el.param)>1){
          if(el.value.match(/\d\d\d\d-\d\d-\d\d\s\d\d\:\d\d\:\d\d/)){
            el.value = el.value.split(' ').map(p=>p.split('-').toReversed().join('.')).join(' ');
          }
          return el;
        })
        .reduce((line,curentData)=>{
          var toLine = ''
          if (line.at(-1) === '\n') {
            toLine+=`${name}\t${acskName}\t${type}\t${number}`;
          }
          if (curentData.param === 'Повне ім\'я') {
            name = curentData.value;
            toLine+=`${name}\t${acskName}\t${type}\t${number}`;
          }
          else {
            toLine+='\t'+curentData.value;
            if (curentData.param === 'Завершення строку дії:') {
              toLine+='\n';
            }
          }

          return line+toLine;

        },'');

        return text;
      }).join('')
    );
  })();


  console.log(textData);

  const insertElement = document.createElement('textarea');
  insertElement.style.width = '100%';
  insertElement.style.height = '300px';
  insertElement.value = textData;

  document.querySelector('.content').appendChild(insertElement);
})();
