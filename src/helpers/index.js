export function getDate(dateTime) {
  const date = new Date(dateTime);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function currentDate() {
  const date = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
}

export const menuData = (name) => {
  switch (name) {
    case 'fashion':
      return [{ name: 'news', id: 152 }, { name: 'fashion week', id: 1310 }, { name: 'jewellery', id: 165 }, { name: 'beauty', id: 171 }];
    case 'travel' :
      return [{ name: 'holidays', id: 160 }, { name: 'hotels', id: 159 }];
    case 'drive' :
      return [{ name: 'auto news', id: 521 }, { name: 'experience', id: 522 }];
    case 'culture' :
      return [
        { name: 'art', id: 149 }, { id: 164, name: 'events' },
        { id: 8, name: 'interviews' }, { id: 172, name: 'true history' },
        { id: 167, name: 'health' },
      ];
    case 'food' :
      return [{ id: 162, name: 'cookbook' }, { id: 161, name: 'dining' }];
    default:
      return [];
  }
}
;
