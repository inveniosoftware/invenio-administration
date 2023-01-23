# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2022 CERN.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Invenio Administration exceptions."""

from flask_babelex import gettext as _


class InvalidResource(Exception):
    """Exception for invalid resources."""

    def __init__(self, resource, view):
        """Initialise error."""
        super().__init__(
            _(
                "Invalid resource {resource} configured for view {view}.".format(
                    resource=resource, view=view
                )
            )
        )


class InvalidExtensionName(KeyError):
    """Exception for invalid extension names."""

    def __init__(self, extension_name):
        """Initialise error."""
        super().__init__(
            _(
                "No extension found with name '{extension_name}' .".format(
                    extension_name=extension_name
                )
            )
        )


class InvalidActionsConfiguration(KeyError):
    """Exception for invalid extension names."""

    def __init__(self):
        """Initialise error."""
        super().__init__(_("Invalid actions configuration, order or schema missing"))


class MissingResourceConfiguration(Exception):
    """Exception for missing resource configurations."""

    def __init__(self, name):
        """Initialise error."""
        super().__init__(
            _(
                "Cannot instantiate resource view {name} without a resource.".format(
                    name=name
                )
            )
        )


class MissingExtensionName(Exception):
    """Exception for missing resource configurations."""

    def __init__(self, name):
        """Initialise error."""
        super().__init__(
            _(
                "Cannot instantiate resource view {name} without an "
                "associated flask extension.".format(
                    name=name
                )
            )
        )


class MissingDefaultGetView(Exception):
    """Exception for missing default GET views."""

    def __init__(self, name):
        """Initialise error."""
        super().__init__(
            _(
                "Cannot instantiate administration view {name} without a "
                "default GET view".format(
                    name=name
                )
            )
        )


class MissingAppId(Exception):
    """Exception for missing application id."""

    def __init__(self, name):
        """Initialise error."""
        super().__init__(
            _(
                "Cannot instantiate resource view {name} without an application id.".format(
                    name=name
                )
            )
        )
