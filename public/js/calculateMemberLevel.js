
function memberLevel(totalDonations) {
  var d = totalDonations

  if (d >= 1000000) {
    return 'Marshall'
  } else if (d >= 500000) {
    return 'General'
  } else if (d >= 250000) {
    return 'Colonel'
  } else if (d >= 100000) {
    return 'Major'
  } else if (d >= 25000) {
    return 'Captain'
  } else if (d >= 10000) {
    return 'Lieutenant'
  } else if (d >= 5000) {
    return 'Seargant'
  } else if (d >= 2500) {
    return 'Corporal'
  } else if (d >= 1000) {
    return 'Scout'
  } else if (d >= 500) {
    return 'Private'
  } else {
    return 'Soldier'
  }

}
