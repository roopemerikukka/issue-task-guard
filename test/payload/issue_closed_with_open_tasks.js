module.exports = {
  event: 'issues',
  payload: {
    'action': 'closed',
    'issue': {
      'id': 307279911,
      'number': 2,
      'title': 'My new issue',
      'user': {
        'login': 'roopemerikukka',
        'id': 1453463
      },
      'state': 'closed',
      'body': '- [x] Task 1\r\n- [ ] Task 2'
    },
    'repository': {
      'id': 126186591,
      'name': 'issue-test-repo',
      'full_name': 'roopemerikukka/issue-test-repo',
      'owner': {
        'login': 'roopemerikukka',
        'id': 1453463
      }
    },
    'installation': {
      'id': 115314
    }
  }
}
