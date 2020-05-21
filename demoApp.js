import angular from 'angular'
import React from 'react'
import PropTypes from "prop-types"
import { react2angular } from 'react2angular'

const demoApp = angular.module('demoApp', [])

demoApp.factory( 'demoService', function() {
  return {
    getHeading: () => 'AngularJS + React',
    popAlert: () => alert( 'Alert from demoService!' ),
    getList: () => [
      { id: 'a', value: "Huey" },
      { id: 'b', value: "Dewey" },
      { id: 'c', value: "Louie" },
    ]
  }
})

demoApp.controller( 'demoCtrl', [ '$scope', 'demoService', ( $scope, demoService ) => {
  $scope.heading = demoService.getHeading()
  $scope.items = demoService.getList()

  $scope.toggled = false

  // This doesn't work
  // $scope.toggle = () => { $scope.toggled = !$scope.toggled }

  $scope.toggle = e => $scope.$apply(
    () => $scope.toggled = !$scope.toggled
  )
}])

const ReactList = ({ items, toggled, onToggle, demoService }) => (
  <>
    <ul>
      { items.map(
        ({ id, value }) => <li key={ id }>{ value }</li>
      )}
    </ul>

    <button onClick={ onToggle }>
      { `Toggle From Controller: ${toggled}` }
    </button>

    <button onClick={ e => demoService.popAlert() }>
      Alert From Angular Service
    </button>
  </>
)

const listItemDef = PropTypes.shape({
  id: PropTypes.string,
  value: PropTypes.string,
})

ReactList.propTypes = {
  items: PropTypes.arrayOf( listItemDef ),
  toggled: PropTypes.bool,
  onToggle: PropTypes.func,
  demoService: PropTypes.object,
}

demoApp.component(
  'reactList',
  react2angular( ReactList, [ 'items', 'toggled', 'onToggle' ], [ 'demoService' ])
  // With PropTypes defined we can ommit the second argument
  // react2angular( ReactList, null, [ 'demoService' ])
)

export default demoApp